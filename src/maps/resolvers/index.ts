import { default as mapsMutations } from "./maps.mutations.js";
import { default as mapsQueries } from "./maps.queries.js";
import { default as mapPoolsMutations } from "./mapPools.mutations.js";
import { default as mapPoolsQueries } from "./mapPools.queries.js";
import { default as mapQueries } from "./map.queries.js";

const resolvers = {
  Query: {
    ...mapsQueries,
    ...mapPoolsQueries,
  },
  Mutation: {
    ...mapsMutations,
    ...mapPoolsMutations,
  },
  Map: {
    ...mapQueries,
  },
};

export default resolvers;
