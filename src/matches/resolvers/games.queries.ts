import { Op } from 'sequelize'

import { Context } from '../../types.js'
import { PaginationResponse, SortDirection } from '../../core/models/index.js'
import { edgesToPaginationResponse, entityToPaginationResponse } from '../../core/utils/pagination.js'
import { IGamesWhere, IGamesOptions, GameSortOption } from '../models/index.js'
import { Game } from '../db/game.js'

interface IGamesArgs {
  where?: IGamesWhere;
  options?: IGamesOptions;
}

interface IGameArgs {
  id: number;
}

const gamesQueries = {
  games: async (parent: unknown, args: IGamesArgs, context: Context): Promise<PaginationResponse<Game>> => {
    if (args.where?.id_EQUALS) {
      const game = await context.db.games.findByPk(args.where?.id_EQUALS)

      return entityToPaginationResponse(game)
    }

    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0
    const sortColumn = args.options?.sort?.option || GameSortOption.by_id
    const sortOrder = args.options?.sort?.direction || SortDirection.ASC

    const where: any = {}

    if (args.where?.name_STARTS_WITH) {
      where.name = {
        [Op.iLike]: `${args.where.name_STARTS_WITH.toLowerCase()}%`,
      }
    }

    const { edges, totalCount } = await context.db.games.paginate({
      where,
      order: [[sortColumn, sortOrder]],
      limit,
      offset,
    })

    return edgesToPaginationResponse(edges, totalCount, offset, limit)
  },

  game: async (parent: unknown, args: IGameArgs, context: Context): Promise<Game | null> => {
    const game = await context.db.games.findByPk(args.id)

    return game
  },
}

export default gamesQueries
