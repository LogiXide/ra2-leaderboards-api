import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbTeamPlayer extends DbBase {
  team_id: number
  player_id: number
}

export default function Postgres_TeamsPlayers(session: Pool): PostgresModel<DbTeamPlayer> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'teams_players', input, ['id']),
    clear: () => delete_from(session, 'teams_players'),
  } as PostgresModel<DbTeamPlayer>
}
