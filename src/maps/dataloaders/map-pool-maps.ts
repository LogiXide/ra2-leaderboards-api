import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { MapPoolMap } from '../db/map-pool-map.js'

export const initMapPoolMapsByMapIdDataLoader = () => {
  return new DataLoader(async (mapIds: Readonly<number[]>): Promise<Array<MapPoolMap[]>> => {
    const mapPoolMaps = await MapPoolMap.findAll({
      where: {
        mapId: {
          [Op.in]: mapIds,
        },
      },
    })

    const mapPoolMapsGrouped = _.groupBy(mapPoolMaps, (it) => it.mapId)
    const results = mapIds.map((mapId) => mapPoolMapsGrouped[mapId] || [])

    return results
  })
}

export const initMapPoolMapsByMapPoolIdDataLoader = () => {
  return new DataLoader(async (mapPoolIds: Readonly<number[]>): Promise<Array<MapPoolMap[]>> => {
    const mapPoolMaps = await MapPoolMap.findAll({
      where: {
        mapPoolId: {
          [Op.in]: mapPoolIds,
        },
      },
    })

    const mapPoolMapsGrouped = _.groupBy(mapPoolMaps, (it) => it.mapId)
    const results = mapPoolIds.map((mapPoolId) => mapPoolMapsGrouped[mapPoolId] || [])

    return results
  })
}


