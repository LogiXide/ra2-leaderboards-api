import { Op } from 'sequelize'

import { Context } from '../../types.js'
import { PaginationResponse, SortDirection } from '../../core/models/index.js'
import { edgesToPaginationResponse, entityToPaginationResponse } from '../../core/utils/pagination.js'
import { IMapsWhere, IMapsOptions, MapSortOption } from '../models/index.js'
import { Map } from '../db/map.js'

interface IMapsArgs {
  where?: IMapsWhere;
  options?: IMapsOptions;
}

interface IMapArgs {
  id: number;
}

const mapsQueries = {
  maps: async (parent: unknown, args: IMapsArgs, context: Context): Promise<PaginationResponse<Map>> => {
    if (args.where?.id_EQUALS) {
      const map = await context.db.maps.findByPk(args.where?.id_EQUALS)

      return entityToPaginationResponse(map)
    }

    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0
    const sortColumn = args.options?.sort?.option || MapSortOption.by_id
    const sortOrder = args.options?.sort?.direction || SortDirection.ASC

    const where: any = {}

    if (args.where?.name_STARTS_WITH) {
      where.name = {
        [Op.iLike]: `${args.where.name_STARTS_WITH.toLowerCase()}%`,
      }
    }

    const { edges, totalCount } = await context.db.maps.paginate({
      where,
      order: [[sortColumn, sortOrder]],
      limit,
      offset,
    })

    return edgesToPaginationResponse(edges, totalCount, offset, limit)
  },

  map: async (parent: unknown, args: IMapArgs, context: Context): Promise<Map | null> => {
    const map = await context.db.maps.findByPk(args.id)

    return map
  },
}

export default mapsQueries
