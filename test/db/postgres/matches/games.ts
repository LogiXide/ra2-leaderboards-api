import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbGame extends DbBase {
  type: string
  winner: string
  map_id: number
  match_id: number
  home_player_id?: number
  home_team_id?: number
  away_player_id?: number
  away_team_id?: number
}

export default function Postgres_Games(session: Pool): PostgresModel<DbGame> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'games', input, ['id']),
    clear: () => delete_from(session, 'games'),
  } as PostgresModel<DbGame>
}
