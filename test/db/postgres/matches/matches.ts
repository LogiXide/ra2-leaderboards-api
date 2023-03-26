import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbMatch extends DbBase {
  type: string
  home_player_id?: number
  home_team_id?: number
  away_player_id?: number
  away_team_id?: number
}

export default function Postgres_Matches(session: Pool): PostgresModel<DbMatch> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'matches', input, ['id']),
    clear: () => delete_from(session, 'matches'),
  } as PostgresModel<DbMatch>
}
