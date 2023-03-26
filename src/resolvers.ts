import { mergeResolvers } from '@graphql-tools/merge'
import mapsResolvers from './maps/resolvers/index.js'
import matchesResolvers from './matches/resolvers/index.js'
import playersResolvers from './players/resolvers/index.js'

const resolvers = [mapsResolvers, matchesResolvers, playersResolvers]

export default mergeResolvers(resolvers)
