import { default as mapsQueries } from './maps.queries.js'
import { default as mapQueries } from './map.queries.js'

const resolvers = {
  Query: {
    ...mapsQueries,
  },
  Map: {
    ...mapQueries,
  },
}

export default resolvers
