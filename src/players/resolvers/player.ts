import { Context } from '../../types.js'
import { IPlayerAttributes } from '../models/index.js'
import { Team } from '../db/team.js'

const playerResolvers = {
  teams: async (parent: IPlayerAttributes, args: unknown, context: Context): Promise<Team[]> => {
    const teamPlayers = await context.dataLoaders.teamPlayersByPlayerId.load(parent.id)
    const teamIds = teamPlayers.map((it) => it.teamId)
    const teams = await context.dataLoaders.mapPools.loadMany(teamIds)

    return teams as Team[]
  },
}

export default playerResolvers
