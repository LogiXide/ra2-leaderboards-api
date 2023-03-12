import DataLoader from "dataloader";

import { MapPoolMap } from "./maps/db/map-pool-map.js";
import { MapPool } from "./maps/db/map-pool.js";
import { Map } from "./maps/db/map.js";

export interface Db {
  maps: typeof Map
  mapPools: typeof MapPool
}

export interface DataLoaders {
  mapPoolMapsByMapId: DataLoader<number, MapPoolMap[], number>
  mapPools: DataLoader<number, MapPool, number>
}

export interface Context {
  token?: String;
  db: Db
  dataLoaders: DataLoaders
}
