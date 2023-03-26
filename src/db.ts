import { Sequelize } from 'sequelize-typescript'
import sequelizeCursorPagination from 'sequelize-cursor-pagination'

import config from './config/config.js'
import { MapPoolMap, MapPool, Map } from './maps/db/index.js'
import { Game, Match } from './matches/db/index.js'
import { Player, Team, TeamPlayer } from './players/db/index.js'

import { Db } from './types.js'

const env = (process.env.NODE_ENV || 'production') as keyof typeof config
const sequelizeOptions = config[env]

export const sequelize = new Sequelize({
  ...sequelizeOptions,
  models: [Game, Map, MapPool, MapPoolMap, Match, Player, Team, TeamPlayer],
  hooks: {
    afterDefine(modelType: any) {
      modelType.paginate = sequelizeCursorPagination.makePaginate(modelType)
    },
  },
  define: {
    underscored: true,
  },
})

const database: Db = {
  games: Game,
  maps: Map,
  mapPools: MapPool,
  matches: Match,
  players: Player,
  teams: Team,
  teamPlayers: TeamPlayer,
}

export default database
