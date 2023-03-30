import { Op } from 'sequelize'

import { Context } from '../../types.js'
import { PaginationResponse } from '../../core/models/index.js'
import { toPaginationResponse } from '../../core/utils/pagination.js'
import { IMapsWhere, IMapsOptions } from '../models/index.js'
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
    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0

    const where: any = {}

    if (args.where?.name_STARTS_WITH) {
      where.name = {
        [Op.iLike]: `${args.where.name_STARTS_WITH.toLowerCase()}%`,
      }
    }

    const { edges, totalCount } = await context.db.maps.paginate({
      where,
      order: [['id', 'ASC']],
      limit,
      offset,
    })

    return toPaginationResponse(edges, totalCount, offset, limit)
  },
  map: async (parent: unknown, args: IMapArgs, context: Context): Promise<Map | null> => {
    const map = await context.db.maps.findByPk(args.id)

    return map
  },
}

export default mapsQueries
