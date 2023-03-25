import {
  initMapPoolMapsByMapPoolIdDataLoader,
  initMapPoolMapsByMapIdDataLoader,
  initMapPoolsDataLoader,
  initMapsDataLoader,
} from './maps/dataloaders/index.js'
import { DataLoaders } from './types.js'

export const initDataLoaders = (): DataLoaders => {
  return {
    mapPoolMapsByMapPoolId: initMapPoolMapsByMapPoolIdDataLoader(),
    mapPoolMapsByMapId: initMapPoolMapsByMapIdDataLoader(),
    mapPools: initMapPoolsDataLoader(),
    maps: initMapsDataLoader(),
  }
}
