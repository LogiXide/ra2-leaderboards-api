import { Context } from '../../types.js'
import { IMapDto } from '../models/index.js'
import { MapPool } from '../db/map-pool.js'

const mapQueries = {
  mapPools: async (parent: IMapDto, args: unknown, context: Context): Promise<MapPool[]> => {

    const mapPoolMaps = await context.dataLoaders.mapPoolMapsByMapId.load(parent.id)
    const mapPoolIds = mapPoolMaps.map(it => it.mapPoolId)
    const mapPools = await context.dataLoaders.mapPools.loadMany(mapPoolIds)

    return mapPools as MapPool[]
  },
}

export default mapQueries
