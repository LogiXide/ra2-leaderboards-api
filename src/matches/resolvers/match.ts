import { Context } from '../../types.js'
import { IMatchDto } from '../models/index.js'
import { Game } from '../db/game.js'

const matchResolvers = {
  games: async (parent: IMatchDto, args: unknown, context: Context): Promise<Game[]> => {
    const games = await context.dataLoaders.gamesByMatchId.load(parent.id)

    return games
  },
}

export default matchResolvers
