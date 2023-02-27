import { Context } from "../../types.js";
import { PaginationResponse } from "../../core/models/index.js";
import { toPaginationResponse } from "../../core/utils/pagination.js";
import { MapsWhere, MapsOptions } from "../models/index.js";
import { Map } from "../db/map.js";

interface Maps_Args {
  where?: MapsWhere,
  options?: MapsOptions,
};

const mapsQueries = {
  maps: async (parent: any, args: Maps_Args, context: Context): Promise<PaginationResponse<Map>> => {
    const limit = args.options?.limit || 100;
    const offset = args.options?.offset || 0;
    console.log(args)
    const { edges, totalCount } = await context.db.maps.paginate({
      order: [
        ['id', 'ASC'],
      ],
      limit,
      offset,
    });

    return toPaginationResponse(edges, totalCount, offset, limit);
  },
};

export default mapsQueries;
