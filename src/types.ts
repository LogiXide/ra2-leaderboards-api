import DataLoader from 'dataloader'

import { MapPoolMap, MapPool, Map } from './maps/db/index.js'
import { Game, Match } from './matches/db/index.js'
import { Player, Team, TeamPlayer } from './players/db/index.js'

export interface Db {
  games: typeof Game;
  maps: typeof Map;
  mapPools: typeof MapPool;
  matches: typeof Match;
  players: typeof Player;
  teams: typeof Team;
  teamPlayers: typeof TeamPlayer;
}

export interface DataLoaders {
  gamesByMatchId: DataLoader<number, Game[], number>;
  mapPoolMapsByMapId: DataLoader<number, MapPoolMap[], number>;
  mapPoolMapsByMapPoolId: DataLoader<number, MapPoolMap[], number>;
  mapPools: DataLoader<number, MapPool, number>;
  maps: DataLoader<number, Map, number>;
  matches: DataLoader<number, Match, number>;
}

export interface Context {
  token?: string;
  db: Db;
  dataLoaders: DataLoaders;
}
