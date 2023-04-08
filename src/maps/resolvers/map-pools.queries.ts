import { Op, WhereOptions } from 'sequelize'

import { Context } from '../../types.js'
import { PaginationResponse, SortDirection } from '../../core/models/index.js'
import { edgesToPaginationResponse, entityToPaginationResponse } from '../../core/utils/pagination.js'
import { IMapPoolsWhere, IMapPoolsOptions, MapPoolSortOption, IMapPoolAttributes } from '../models/index.js'
import { MapPool } from '../db/map-pool.js'

interface IMapPoolsArgs {
  where?: IMapPoolsWhere;
  options?: IMapPoolsOptions;
}

interface IMapPoolArgs {
  id: number;
}

const mapPoolsQueries = {
  mapPools: async (parent: unknown, args: IMapPoolsArgs, context: Context): Promise<PaginationResponse<MapPool>> => {
    if (args.where?.id_EQUALS) {
      const mapPool = await context.db.mapPools.findByPk(args.where?.id_EQUALS)

      return entityToPaginationResponse(mapPool)
    }

    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0
    const sortColumn = args.options?.sort?.option || MapPoolSortOption.by_id
    const sortOrder = args.options?.sort?.direction || SortDirection.ASC

    const where: WhereOptions<IMapPoolAttributes> = {}

    if (args.where?.name_STARTS_WITH) {
      where.name = {
        [Op.iLike]: `${args.where.name_STARTS_WITH.toLowerCase()}%`,
      }
    }

    const { edges, totalCount } = await context.db.mapPools.paginate({
      where,
      order: [[sortColumn, sortOrder]],
      limit,
      offset,
    })

    return edgesToPaginationResponse(edges, totalCount, offset, limit)
  },

  mapPool: async (parent: unknown, args: IMapPoolArgs, context: Context): Promise<MapPool | null> => {
    const mapPool = await context.db.mapPools.findByPk(args.id)

    return mapPool
  },
}

export default mapPoolsQueries
