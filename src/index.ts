import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import resolvers from './resolvers.js'
import typeDefs from './typeDefs.js'

import { initDataLoaders } from './dataloaders.js'
import db from './db.js'
import { Context } from './types.js'

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // ApolloServerPluginLandingPageDisabled(),
  ],
})

await server.start()

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware<Context>(server, {
    context: async ({ req }: any) => ({
      token: req.headers.token,
      db,
      dataLoaders: initDataLoaders(),
    }),
  }),
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log('🚀 Server ready at http://localhost:4000/graphql')
