import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { Map } from '../db/map.js'

export const initMapsDataLoader = () =>
  new DataLoader(async (ids: Readonly<number[]>): Promise<Array<Map>> => {
    const maps = await Map.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    const mapsIndexed = _.keyBy(maps, (it) => it.id)
    const results = ids.map((id) => mapsIndexed[id] as Map)

    return results
  })
