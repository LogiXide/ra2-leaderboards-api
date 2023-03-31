import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { Match } from '../db/match.js'

export const initMatchesDataLoader = () =>
  new DataLoader(async (ids: Readonly<number[]>): Promise<Array<Match>> => {
    const matches = await Match.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    const matchesIndexed = _.keyBy(matches, (it) => it.id)
    const results = ids.map((id) => matchesIndexed[id] as Match)

    return results
  })
