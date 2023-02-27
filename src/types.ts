import { Map } from "maps/db/map.js";

export interface Db {
  maps: typeof Map
}

export interface Context {
  token?: String;
  db: Db
}
