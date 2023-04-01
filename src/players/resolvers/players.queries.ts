import { Context } from '../../types.js'
import { PaginationResponse } from '../../core/models/index.js'
import { toPaginationResponse } from '../../core/utils/pagination.js'
import { IPlayersWhere, IPlayersOptions } from '../models/index.js'
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
    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0

    const { edges, totalCount } = await context.db.players.paginate({
      order: [['id', 'ASC']],
      limit,
      offset,
    })

    return toPaginationResponse(edges, totalCount, offset, limit)
  },
  player: async (parent: unknown, args: IPlayerArgs, context: Context): Promise<Player | null> => {
    const player = await context.db.players.findByPk(args.id)

    return player
  },
}

export default playersQueries
