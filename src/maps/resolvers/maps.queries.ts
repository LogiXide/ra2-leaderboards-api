import { Context } from "../../types.js";

const mapsQueries = {
  maps: async (_: any, args: any, context: Context) => {
    const maps = await context.mapRepository.findAll()

    return maps
  },
};

export default mapsQueries;
