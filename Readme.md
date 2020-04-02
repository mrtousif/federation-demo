# Federation demo with Apollo and Fastify

This repository is a demo of using GraphQL Gateway to build a single schema on top of multiple services. The microservices are located under the [`./services`](./services/) folder and the gateway that composes the overall schema is in the root. The repository contains the original Apollo Federation example and also a [Fastify-GQL](https://github.com/mcollina/fastify-gql) example for comparison.

## What is this?

This demo showcases four partial schemas running as federated microservices. Each of these schemas can be accessed on their own and form a partial shape of an overall schema. The gateway fetches the service capabilities from the running services to create an overall composed schema which can be queried. 

To learn more about Apollo Federation, check out the [docs](https://www.apollographql.com/docs/apollo-server/federation/introduction)

## Installation

To run this demo locally, pull down the repository then run the following commands:

```sh
npm install
```

This will install all of the dependencies for the gateway and each underlying service.

## Apollo Federation Demo

The microservices are located under the [`./services`](./services/) folder `index.js` files and the gateway that composes the overall schema is in the [`gateway.js`](./gateway.js) file.

To see the query plan when running queries against the gateway, click on the `Query Plan` tab in the bottom right hand corner of [GraphQL Playground](http://localhost:4000)

### Running the demo

```sh
npm run start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:4001, http://localhost:4002, http://localhost:4003, and http://localhost:4004.

In another terminal window, run the gateway by running this command:

```sh
npm run start-gateway
```

This will start up the gateway and serve it at http://localhost:4000

## Fastify Demo

The microservices are located under the [`./services`](./services/) folder `fastify-index.js` files and the gateway that composes the overall schema is in the [`fastify-gateway.js`](./fastify-gateway.js) file.

### Running the demo

```sh
npm run fastify:start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:3001/graphiql, http://localhost:3002/graphiql, http://localhost:3003/graphiql, and http://localhost:3004/graphiql.

In another terminal window, run the gateway by running this command:

```sh
npm run fastify:start-gateway
```

This will start up the gateway and serve it at http://localhost:3000/graphiql
