import { default as playersQueries } from './players.queries.js'
import { default as playersMutations } from './players.mutations.js'
import { default as teamsQueries } from './teams.queries.js'
import { default as teamsMutations } from './teams.mutations.js'

const resolvers = {
  Query: {
    ...playersQueries,
    ...teamsQueries
  },
  Mutation: {
    ...playersMutations,
    ...teamsMutations
  },
}

export default resolvers
