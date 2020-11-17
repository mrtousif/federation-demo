const Fastify = require("fastify");
const mercurius = require("mercurius");
const { users } = require("../../../data/accounts");

const app = Fastify();

const schema = `
  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
    friends: [User]
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return users[0];
    },
  },
  User: {
    friends: (user) => {
      return users.filter((u) => u.id !== user.id);
    },
  },
};

const loaders = {
  User: {
    __resolveReference: {
      async loader(query, { reply }) {
        return query.map(({ obj }) => users.find((user) => user.id === obj.id));
      },
      opts: {
        cache: true,
      },
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  loaders,
  graphiql: true,
  federationMetadata: true,
});

app.listen(3001);
