import { default as playersQueries } from './players.queries.js'
import { default as teamsQueries } from './teams.queries.js'

const resolvers = {
  Query: {
    ...playersQueries,
    ...teamsQueries,
  },
}

export default resolvers
