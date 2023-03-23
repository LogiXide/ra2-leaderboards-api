import { range } from '../utils/array-helpers.js'

export default (models: any) => {
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

