import { Repository } from "sequelize-typescript";
import { Map } from "src/maps/db/map.js";

export interface Context {
  token?: String;
  mapRepository: Repository<Map>;
}
