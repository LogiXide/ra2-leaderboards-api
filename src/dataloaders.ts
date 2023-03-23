import { initMapPoolMapsByMapIdDataLoader, initMapPoolsDataLoader } from './maps/dataloaders/index.js'
import { DataLoaders, Db } from './types.js'

export const initDataLoaders = (): DataLoaders => {
  return {
    mapPoolMapsByMapId: initMapPoolMapsByMapIdDataLoader(),
    mapPools: initMapPoolsDataLoader(),
  }
}
