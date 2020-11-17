const Fastify = require("fastify");
const mercurius = require("mercurius");
const { inventory } = require("../../../data/inventory");

const app = Fastify();

const schema = `
  extend type Product @key(fields: "upc") {
    upc: String! @external
    weight: Int @external
    price: Int @external
    inStock: Boolean
    shippingEstimate: Int @requires(fields: "price weight")
  }
`;

const resolvers = {
  Product: {
    __resolveReference: (object) => {
      return {
        ...object,
        ...inventory.find((product) => product.upc === object.upc),
      };
    },
    shippingEstimate: (object) => {
      // free for expensive items
      if (object.price > 1000) return 0;
      // estimate is based on weight
      return object.weight * 0.5;
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  federationMetadata: true,
  graphiql: true,
});

app.listen(3004);
