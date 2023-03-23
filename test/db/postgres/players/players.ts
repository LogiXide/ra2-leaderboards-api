import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbPlayer extends DbBase {
  name: string
}

export default function Postgres_Players(session: Pool): PostgresModel<DbPlayer> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'players', input, ['id']),
    clear: () => delete_from(session, 'players'),
  } as PostgresModel<DbPlayer>
}
