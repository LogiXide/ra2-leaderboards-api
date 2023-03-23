import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbMap extends DbBase {
  name: string
  spots: number
  author: string
  image_url: string
}

export default function Postgres_Maps(session: Pool): PostgresModel<DbMap> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'maps', input, ['id']),
    clear: () => delete_from(session, 'maps'),
  } as PostgresModel<DbMap>
}
