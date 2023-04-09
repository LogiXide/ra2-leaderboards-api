import { Models } from '../db/index.js'
import { range } from '../utils/array-helpers.js'
import { Ref } from '../utils/TestDataBuilder.js'
import { FixtureItem, Fixture } from './types.js'

export default (models: Models, ref: Ref): Fixture => {
  const Team = models.Postgres_Teams
  const Player = models.Postgres_Players
  const TeamsPlayer = models.Postgres_TeamsPlayers

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

  const players = [
    {
      name: 'zhasulan',
      model: Player,
      data: {
        name: '[kz]Zhasulan',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'alexeyk',
      model: Player,
      data: {
        name: 'alexeyk',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'gamzat',
      model: Player,
      data: {
        name: '[R]Gamzat001',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'marko',
      model: Player,
      data: {
        name: 'Sai',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
  ]

  const teamsPlayers = [
    ...[
      {
        team_id: ref('team1.id'),
        player_id: ref('zhasulan.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('team1.id'),
        player_id: ref('alexeyk.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    ].map((data, index) =>
      ({
        name: `team_player_${index}`,
        model: TeamsPlayer,
        data,
      })
    ),
  ]

  return {
    require: [],
    data: [
      ...teams,
      ...players,
      ...teamsPlayers,
    ],
  }
}
