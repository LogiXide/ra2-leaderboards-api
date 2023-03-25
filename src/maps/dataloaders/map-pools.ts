import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { MapPool } from '../db/map-pool.js'

export const initMapPoolsDataLoader = () =>
  new DataLoader(async (ids: Readonly<number[]>): Promise<Array<MapPool>> => {
    const mapPools = await MapPool.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    const mapPoolsIndexed = _.keyBy(mapPools, (it) => it.id)
    const results = ids.map((id) => mapPoolsIndexed[id] as MapPool)

    return results
  })
