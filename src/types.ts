import DataLoader from "dataloader";

import { MapPoolMap, MapPool, Map } from "./maps/db/index.js";
import { Player, Team, TeamPlayer } from "./players/db/index.js";

export interface Db {
  maps: typeof Map
  mapPools: typeof MapPool
  players: typeof Player,
  teams: typeof Team,
  teamPlayers: typeof TeamPlayer,
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
