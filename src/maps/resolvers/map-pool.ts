import { Context } from '../../types.js'
import { IMapPoolAttributes } from '../models/index.js'
import { Map } from '../db/map.js'

const mapPoolResolvers = {
  maps: async (parent: IMapPoolAttributes, args: unknown, context: Context): Promise<Map[]> => {
    const mapPoolMaps = await context.dataLoaders.mapPoolMapsByMapPoolId.load(parent.id)
    const mapIds = mapPoolMaps.map((it) => it.mapId)
    const maps = await context.dataLoaders.maps.loadMany(mapIds)

    return maps as Map[]
  },
}

export default mapPoolResolvers
