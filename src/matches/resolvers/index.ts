import { default as gameResolvers } from './game.js'
import { default as gamesQueries } from './games.queries.js'
import { default as matchResolvers } from './match.js'
import { default as matchesQueries } from './matches.queries.js'

const resolvers = {
  Query: {
    ...gamesQueries,
    ...matchesQueries,
  },
  Game: {
    ...gameResolvers,
  },
  Match: {
    ...matchResolvers,
  },
}

export default resolvers
