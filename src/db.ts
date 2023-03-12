import { ModelType, Sequelize } from 'sequelize-typescript'
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
  hooks: {
    afterDefine(modelType: any) {
      modelType.paginate = sequelizeCursorPagination.makePaginate(modelType);
    }
  },
  define: {
    underscored: true,
  },
});

const database: Db = {
  maps: Map,
  mapPools: MapPool,
}

export default database
