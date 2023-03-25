import { Models } from '../db/index.js'
import { range } from '../utils/array-helpers.js'
import { Fixture } from './types.js'

export default (models: Models): Fixture => {
  const MapPool = models.Postgres_MapPools
  const Map = models.Postgres_Maps

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

  const maps = [
    {
      name: 'tiburon',
      model: Map,
      data: {
        name: 'Tiburon',
        spots: 4,
        author: 'JaladTanaga / Burg',
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'snow_valley',
      model: Map,
      data: {
        name: 'Snow Valley TL v BR',
        spots: 2,
        author: 'Westwood Studios',
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'dannath',
      model: Map,
      data: {
        name: 'Dannath',
        spots: 2,
        author: 'JaladTanaga',
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'estaminia',
      model: Map,
      data: {
        name: 'Estaminia',
        spots: 2,
        author: '[RU]Poluy',
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
  ]

  return {
    require: [],
    data: [
      ...mapPools,
      ...maps,
    ],
  }
}

