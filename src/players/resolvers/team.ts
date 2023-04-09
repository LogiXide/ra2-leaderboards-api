import { Context } from '../../types.js'
import { ITeamAttributes } from '../models/index.js'
import { Player } from '../db/player.js'

const teamResolvers = {
  players: async (parent: ITeamAttributes, args: unknown, context: Context): Promise<Player[]> => {
    const teamPlayers = await context.dataLoaders.teamPlayersByTeamId.load(parent.id)
    const playerIds = teamPlayers.map((it) => it.playerId)
    const players = await context.dataLoaders.players.loadMany(playerIds)

    return players as Player[]
  },
}

export default teamResolvers
