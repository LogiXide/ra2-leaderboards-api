import { default as mapsQueries } from "./maps.queries.js";
import { default as mapPoolsQueries } from "./mapPools.queries.js";
import { default as mapQueries } from "./map.queries.js";

const resolvers = {
  Query: {
    ...mapsQueries,
    ...mapPoolsQueries,
  },
  Map: {
    ...mapQueries,
  },
};

export default resolvers;
