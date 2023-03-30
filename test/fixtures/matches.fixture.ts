import { Models } from '../db/index.js'
import { Ref } from '../utils/TestDataBuilder.js'
import { Fixture } from './types.js'

export default (models: Models, ref: Ref): Fixture => {
  const Game = models.Postgres_Games
  const Map = models.Postgres_Maps
  const Match = models.Postgres_Matches
  const Player = models.Postgres_Players
  const Team = models.Postgres_Teams

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

  const teams = [
    {
      name: 'team0',
      model: Team,
      data: {
        name: 'team0',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'team1',
      model: Team,
      data: {
        name: 'team1',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    }
  ]

  const matches = [
    {
      name: 'match0',
      model: Match,
      data: {
        type: 'single',
        winner: 'home',
        home_player_id: ref('zhasulan.id'),
        away_player_id: ref('alexeyk.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'match1',
      model: Match,
      data: {
        type: 'single',
        winner: 'away',
        home_player_id: ref('zhasulan.id'),
        away_player_id: ref('gamzat.id'),
        created_at: new Date(Date.UTC(2023, 1, 2, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 2, 0, 0, 0)),
      },
    },
    {
      name: 'match2',
      model: Match,
      data: {
        type: 'single',
        winner: 'home',
        home_player_id: ref('zhasulan.id'),
        away_player_id: ref('marko.id'),
        created_at: new Date(Date.UTC(2023, 1, 3, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 3, 0, 0, 0)),
      },
    },
    {
      name: 'match3',
      model: Match,
      data: {
        type: 'single',
        winner: 'home',
        home_player_id: ref('zhasulan.id'),
        away_player_id: ref('alexeyk.id'),
        created_at: new Date(Date.UTC(2023, 1, 4, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 4, 0, 0, 0)),
      },
    },
  ]

  const games = [
    {
      name: 'match0_game0',
      model: Game,
      data: {
        type: 'single',
        winner: 'home',
        map_id: ref('tiburon.id'),
        match_id: ref('match0.id'),
        home_player_id: ref('zhasulan.id'),
        away_player_id: ref('alexeyk.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'match1_game0',
      model: Game,
      data: {
        type: 'single',
        winner: 'away',
        map_id: ref('snow_valley.id'),
        match_id: ref('match1.id'),
        home_player_id: ref('zhasulan.id'),
        away_player_id: ref('gamzat.id'),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
  ]

  return {
    require: [],
    data: [
      ...maps,
      ...players,
      ...teams,
      ...matches,
      ...games,
    ],
  }
}

