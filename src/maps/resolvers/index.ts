import { default as mapPoolResolvers } from './map-pool.js'
import { default as mapPoolsMutations } from './map-pools.mutations.js'
import { default as mapPoolsQueries } from './map-pools.queries.js'
import { default as mapResolvers } from './map.js'
import { default as mapsMutations } from './maps.mutations.js'
import { default as mapsQueries } from './maps.queries.js'

const resolvers = {
  Query: {
    ...mapsQueries,
    ...mapPoolsQueries,
  },
  Mutation: {
    ...mapsMutations,
    ...mapPoolsMutations,
  },
  MapPool: {
    ...mapPoolResolvers,
  },
  Map: {
    ...mapResolvers,
  },
}

export default resolvers
