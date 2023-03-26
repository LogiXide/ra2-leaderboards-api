import { Context } from '../../types.js'
import { PaginationResponse } from '../../core/models/index.js'
import { toPaginationResponse } from '../../core/utils/pagination.js'
import { IGamesWhere, IGamesOptions } from '../models/index.js'
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
    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0

    const { edges, totalCount } = await context.db.games.paginate({
      order: [['id', 'ASC']],
      limit,
      offset,
    })

    return toPaginationResponse(edges, totalCount, offset, limit)
  },
  game: async (parent: unknown, args: IGameArgs, context: Context): Promise<Game | null> => {
    const game = await context.db.games.findByPk(args.id)

    return game
  },
}

export default gamesQueries
