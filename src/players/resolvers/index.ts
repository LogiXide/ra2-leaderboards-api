import { default as teamResolvers } from './team.js'
import { default as teamsMutations } from './teams.mutations.js'
import { default as teamsQueries } from './teams.queries.js'
import { default as playerResolvers} from './player.js'
import { default as playersMutations } from './players.mutations.js'
import { default as playersQueries } from './players.queries.js'

const resolvers = {
  Query: {
    ...playersQueries,
    ...teamsQueries
  },
  Mutation: {
    ...playersMutations,
    ...teamsMutations
  },
  Team: {
    ...teamResolvers,
  },
  Player: {
    ...playerResolvers,
  },
}

export default resolvers
