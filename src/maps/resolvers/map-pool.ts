import { Context } from '../../types.js'
import { IMapPoolDto } from '../models/index.js'
import { Map } from '../db/map.js'

const mapPoolResolvers = {
  maps: async (parent: IMapPoolDto, args: unknown, context: Context): Promise<Map[]> => {
    const mapPoolMaps = await context.dataLoaders.mapPoolMapsByMapId.load(parent.id)
    const mapIds = mapPoolMaps.map((it) => it.mapId)
    const maps = await context.dataLoaders.maps.loadMany(mapIds)

    return maps as Map[]
  },
}

export default mapPoolResolvers
