const Fastify = require('fastify')
const GQL = require('fastify-gql')

const app = Fastify()

const typeDefs = `
  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return users[0];
    }
  },
  User: {
    __resolveReference: (object) => {
      return users.find(user => user.id === object.id);
    }
  }
};

app.register(GQL, {
  schema: typeDefs,
  resolvers,
  federationMetadata: true,
  graphiql: true
})

app.listen(4001)

const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    birthDate: "1815-12-10",
    username: "@ada"
  },
  {
    id: "2",
    name: "Alan Turing",
    birthDate: "1912-06-23",
    username: "@complete"
  }
];
