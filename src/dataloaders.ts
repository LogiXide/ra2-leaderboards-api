import { initMapPoolMapsByMapIdDataLoader, initMapPoolsDataLoader } from './maps/dataloaders/index.js'
import { DataLoaders, Db } from './types.js'

export const initDataLoaders = (db: Db): DataLoaders => {
  return {
    mapPoolMapsByMapId: initMapPoolMapsByMapIdDataLoader(db),
    mapPools: initMapPoolsDataLoader(db),
  }
}
