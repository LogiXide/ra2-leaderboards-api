import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbTeam extends DbBase {
  name: string
}

export default function Postgres_Teams(session: Pool): PostgresModel<DbTeam> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'teams', input, ['id']),
    clear: () => delete_from(session, 'teams'),
  } as PostgresModel<DbTeam>
}
