import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { Game } from '../db/game.js'

export const initGamesByMatchIdDataLoader = () =>
  new DataLoader(async (matchIds: Readonly<number[]>): Promise<Array<Game[]>> => {
    const games = await Game.findAll({
      where: {
        matchId: {
          [Op.in]: matchIds,
        },
      },
    })

    const gamesGrouped = _.groupBy(games, (it) => it.matchId)
    const results = matchIds.map((matchId) => (gamesGrouped[matchId] || []) as Game[])

    console.log(results.map(r => r.flatMap(r2 => r2.toJSON())))

    return results
  })
