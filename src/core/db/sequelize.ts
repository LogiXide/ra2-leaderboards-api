import { Sequelize } from 'sequelize-typescript'

import { Map } from '../../maps/db/map.js'
import { MapPool } from '../../maps/db/map-pool.js'
import { MapPoolMap } from '../../maps/db/map-pool-map.js'

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: "postgres",
  password: "killmenot",
  database: "postgres",
  host: "127.0.0.1",
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
