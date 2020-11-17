const Fastify = require("fastify");
const mercurius = require("mercurius");
const { products } = require("../../../data/products");

const app = Fastify();

const schema = `
  extend type Query {
    topProducts(first: Int = 5): [Product]
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`;

const resolvers = {
  Product: {
    __resolveReference: (object) => {
      return products.find((product) => product.upc === object.upc);
    },
  },
  Query: {
    topProducts: (_, args) => {
      return products.slice(0, args.first);
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  federationMetadata: true,
  graphiql: true,
});

app.listen(3003);
