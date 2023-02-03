import { Sequelize } from 'sequelize-typescript'

import { Map } from 'maps/db/map.js'
import { MapPool } from 'maps/db/map-pool.js'
import { MapPoolMap } from 'maps/db/map-pool-map.js'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.development.sqlite',
  models: [
    Map,
    MapPool,
    MapPoolMap,
  ],
  repositoryMode: true,
});
