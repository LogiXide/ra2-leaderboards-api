import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // ApolloServerPluginLandingPageDisabled(),
  ],
});

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token
    }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log(`🚀 Server ready at http://localhost:4000/graphql`)
