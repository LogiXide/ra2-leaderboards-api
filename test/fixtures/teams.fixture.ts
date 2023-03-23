import { Models } from '../db/index.js'
import { range } from '../utils/array-helpers.js'
import { FixtureItem, Fixture } from './types.js'

export default (models: Models): Fixture => {
  const Team = models.Postgres_Teams

  const teams: FixtureItem[] = [
    ...range(5).map(n =>
      ({
        name: `team${n}`,
        model: Team,
        data: {
          name: `team${n}`,
          created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
          updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        },
      })
    )
  ]

  return {
    require: [],
    data: [
      ...teams,
    ],
  }
}
