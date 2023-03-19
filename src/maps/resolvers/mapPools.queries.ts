import { Context } from "../../types.js";
import { PaginationResponse } from "../../core/models/index.js";
import { toPaginationResponse } from "../../core/utils/pagination.js";
import { IMapPoolsWhere, IMapPoolsOptions } from "../models/index.js";
import { MapPool } from "../db/map-pool.js";

interface IMapPoolsArgs {
  where?: IMapPoolsWhere;
  options?: IMapPoolsOptions;
}

interface IMapPoolArgs {
  id: number;
}

const mapPoolsQueries = {
  mapPools: async (parent: unknown, args: IMapPoolsArgs, context: Context): Promise<PaginationResponse<MapPool>> => {
    const limit = args.options?.limit || 100;
    const offset = args.options?.offset || 0;

    const { edges, totalCount } = await context.db.mapPools.paginate({
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    return toPaginationResponse(edges, totalCount, offset, limit);
  },
  mapPool: async (parent: unknown, args: IMapPoolArgs, context: Context): Promise<MapPool | null> => {
    const mapPool = await context.db.mapPools.findByPk(args.id);

    return mapPool;
  },
};

export default mapPoolsQueries;
