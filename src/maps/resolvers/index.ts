import { default as mapsQueries } from './maps.queries.js'

const resolvers = {
  Query: {
    ...mapsQueries,
  },
}

export default resolvers
