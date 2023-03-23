import { range } from '../utils/array-helpers.js'

export default (models: any) => {
  const Team = models.Postgres_Teams

  const teams = [
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
