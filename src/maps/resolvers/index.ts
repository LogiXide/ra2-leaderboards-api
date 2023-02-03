import { default as mapsQueries } from './queries.js'

const resolvers = {
  Query: {
    ...mapsQueries,
  },
}

export default resolvers
