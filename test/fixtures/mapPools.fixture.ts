import { Models } from '../db/index.js'
import { range } from '../utils/array-helpers.js'
import { Fixture } from './types.js'

export default (models: Models): Fixture => {
  const MapPool = models.Postgres_MapPools

  const mapPools = [
    ...range(5).map(n =>
      ({
        name: `mapPool${n}`,
        model: MapPool,
        data: {
          name: `mapPool${n}`,
          created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
          updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        },
      })
    )
  ]

  return {
    require: [],
    data: [
      ...mapPools,
    ],
  }
}

