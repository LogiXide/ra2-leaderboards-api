import { Op, WhereOptions } from 'sequelize'

import { Context } from '../../types.js'
import { PaginationResponse, SortDirection } from '../../core/models/index.js'
import { edgesToPaginationResponse, entityToPaginationResponse } from '../../core/utils/pagination.js'
import { IPlayersWhere, IPlayersOptions, PlayerSortOption, IPlayerAttributes } from '../models/index.js'
import { Player } from '../db/player.js'

interface IPlayersArgs {
  where?: IPlayersWhere;
  options?: IPlayersOptions;
}

interface IPlayerArgs {
  id: number;
}

const playersQueries = {
  players: async (parent: unknown, args: IPlayersArgs, context: Context): Promise<PaginationResponse<Player>> => {
    if (args.where?.id_EQUALS) {
      const player = await context.db.players.findByPk(args.where?.id_EQUALS)

      return entityToPaginationResponse(player)
    }

    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0
    const sortColumn = args.options?.sort?.option || PlayerSortOption.by_id
    const sortOrder = args.options?.sort?.direction || SortDirection.ASC

    const where: WhereOptions<IPlayerAttributes> = {}

    if (args.where?.name_STARTS_WITH) {
      where.name = {
        [Op.iLike]: `${args.where.name_STARTS_WITH.toLowerCase()}%`,
      }
    }

    const { edges, totalCount } = await context.db.players.paginate({
      where,
      order: [[sortColumn, sortOrder]],
      limit,
      offset,
    })

    return edgesToPaginationResponse(edges, totalCount, offset, limit)
  },

  player: async (parent: unknown, args: IPlayerArgs, context: Context): Promise<Player | null> => {
    const player = await context.db.players.findByPk(args.id)

    return player
  },
}

export default playersQueries
