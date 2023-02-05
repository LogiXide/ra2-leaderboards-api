import { Sequelize } from 'sequelize-typescript'

import { Map } from '../../maps/db/map.js'
import { MapPool } from '../../maps/db/map-pool.js'
import { MapPoolMap } from '../../maps/db/map-pool-map.js'
import config from '../../config/config.js'

const env = (process.env.NODE_ENV || 'production') as keyof typeof config
const sequelizeOptions = config[env]

const sequelize = new Sequelize({
  ...sequelizeOptions,
  models: [
    Map,
    MapPool,
    MapPoolMap,
  ],
  define: {
    underscored: true,
  },
  repositoryMode: true,
});

export default sequelize
