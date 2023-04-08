import { Models } from '../db/index.js'
import { Ref } from '../utils/TestDataBuilder.js'
import { Fixture } from './types.js'

export default (models: Models, ref: Ref): Fixture => {
  const Player = models.Postgres_Players
  const Team = models.Postgres_Teams
  const TeamsPlayer = models.Postgres_TeamsPlayers

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
    {
      name: 'lgnd',
      model: Player,
      data: {
        name: 'LGND',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'kwos',
      model: Player,
      data: {
        name: 'Kwos',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'latof',
      model: Player,
      data: {
        name: 'Latof',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
  ]

  const teams = [
    {
      name: 'ra2',
      model: Team,
      data: {
        name: 'Red Alert 2',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'yr',
      model: Team,
      data: {
        name: 'Yuri\'s Revenge',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
  ]

  const teamsPlayers = [
    ...[
      {
        team_id: ref('yr.id'),
        player_id: ref('zhasulan.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('yr.id'),
        player_id: ref('alexeyk.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('yr.id'),
        player_id: ref('gamzat.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('ra2.id'),
        player_id: ref('marko.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('ra2.id'),
        player_id: ref('lgnd.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('ra2.id'),
        player_id: ref('kwos.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        team_id: ref('ra2.id'),
        player_id: ref('latof.id'),
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
      ...players,
      ...teams,
      ...teamsPlayers,
    ],
  }
}
