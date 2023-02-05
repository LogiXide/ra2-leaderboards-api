import { Context } from "../../types.js";

const mapsQueries = {
  maps: async (_: any, args: any, context: Context) => {
    const maps = await context.db.maps.findAll()

    const a = await context.db.maps.paginate({
      limit: 2,
    })

    console.log(a)

    return maps
  },
};

export default mapsQueries;
