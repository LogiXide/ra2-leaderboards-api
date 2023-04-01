import { Context } from '../../types.js'
import { Map } from '../../maps/db/map.js'
import { IGameAttributes } from '../models/index.js'
import { Match } from '../db/match.js'

const gameResolvers = {
  match: async (parent: IGameAttributes, args: unknown, context: Context): Promise<Match> => {
    const match = await context.dataLoaders.matches.load(parent.matchId)

    return match
  },
  map: async (parent: IGameAttributes, args: unknown, context: Context): Promise<Map> => {
    const map = await context.dataLoaders.maps.load(parent.mapId)

    return map
  },
}

export default gameResolvers
