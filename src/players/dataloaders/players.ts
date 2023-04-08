import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { Player } from '../db/player.js'

export const initPlayersDataLoader = () =>
  new DataLoader(async (ids: Readonly<number[]>): Promise<Array<Player>> => {
    const players = await Player.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    const playersIndexed = _.keyBy(players, (it) => it.id)
    const results = ids.map((id) => playersIndexed[id] as Player)

    return results
  })
