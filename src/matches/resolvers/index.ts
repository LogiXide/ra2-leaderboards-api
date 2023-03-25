import { default as gamesQueries } from './games.queries.js'
import { default as matchesQueries } from './matches.queries.js'

const resolvers = {
  Query: {
    ...gamesQueries,
    ...matchesQueries,
  },
}

export default resolvers
