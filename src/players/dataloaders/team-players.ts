import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { TeamPlayer } from '../db/team-player.js'

export const initTeamPlayersByPlayerIdDataLoader = () => {
  return new DataLoader(async (playerIds: Readonly<number[]>): Promise<Array<TeamPlayer[]>> => {
    const teamPlayers = await TeamPlayer.findAll({
      where: {
        playerId: {
          [Op.in]: playerIds,
        },
      },
    })

    const teamPlayersGrouped = _.groupBy(teamPlayers, (it) => it.playerId)
    const results = playerIds.map((playerId) => teamPlayersGrouped[playerId] || [])

    return results
  })
}

export const initTeamPlayersByTeamIdDataLoader = () => {
  return new DataLoader(async (teamIds: Readonly<number[]>): Promise<Array<TeamPlayer[]>> => {
    const teamPlayers = await TeamPlayer.findAll({
      where: {
        teamId: {
          [Op.in]: teamIds,
        },
      },
    })

    const teamPlayersGrouped = _.groupBy(teamPlayers, (it) => it.teamId)
    const results = teamIds.map((teamId) => teamPlayersGrouped[teamId] || [])

    return results
  })
}


