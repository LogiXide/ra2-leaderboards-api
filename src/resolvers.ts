import { mergeResolvers } from '@graphql-tools/merge'
import mapsResolvers from './maps/resolvers/index.js'

const resolvers = [
  mapsResolvers,
]

export default mergeResolvers(resolvers)
