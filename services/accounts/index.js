const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

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
  enableFederation: true,
  graphiql: true
})

app.listen(4005)

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs: gql`
        extend type Query {
          me: User
        }

        type User @key(fields: "id") {
          id: ID!
          name: String
          username: String
        }
      `,
      resolvers: {
        Query: {
          me() {
            return users[0];
          }
        },
        User: {
          __resolveReference(object) {
            return users.find(user => user.id === object.id);
          }
        }
      }
    }
  ])
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

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
