import { Context } from "../../types.js";
import { PaginationResponse } from "../../core/models/index.js";
import { toPaginationResponse } from "../../core/utils/pagination.js";
import { IMapsWhere, IMapsOptions } from "../models/index.js";
import { Map } from "../db/map.js";

interface IMapsArgs {
  where?: IMapsWhere,
  options?: IMapsOptions,
};

const mapsQueries = {
  maps: async (parent: unknown, args: IMapsArgs, context: Context): Promise<PaginationResponse<Map>> => {
    const limit = args.options?.limit || 100;
    const offset = args.options?.offset || 0;

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
