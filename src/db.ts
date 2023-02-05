import { Sequelize } from 'sequelize-typescript'
import sequelizeCursorPagination from 'sequelize-cursor-pagination'

import config from './config/config.js'
import { Map } from './maps/db/map.js'
import { MapPool } from './maps/db/map-pool.js'
import { MapPoolMap } from './maps/db/map-pool-map.js'
import { Db } from './types.js'

const env = (process.env.NODE_ENV || 'production') as keyof typeof config
const sequelizeOptions = config[env]

export const sequelize = new Sequelize({
  ...sequelizeOptions,
  models: [
    Map,
    MapPool,
    MapPoolMap,
  ],
  define: {
    underscored: true,
  },
});

Map.paginate = sequelizeCursorPagination.makePaginate(Map);

const database: Db = {
  maps: Map
}

export default database
