import { Context } from '../../types.js'
import { IMapAttributes } from '../models/index.js'
import { MapPool } from '../db/map-pool.js'

const mapResolvers = {
  mapPools: async (parent: IMapAttributes, args: unknown, context: Context): Promise<MapPool[]> => {
    const mapPoolMaps = await context.dataLoaders.mapPoolMapsByMapId.load(parent.id)
    const mapPoolIds = mapPoolMaps.map((it) => it.mapPoolId)
    const mapPools = await context.dataLoaders.mapPools.loadMany(mapPoolIds)

    return mapPools as MapPool[]
  },
}

export default mapResolvers
