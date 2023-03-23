import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbMapPool extends DbBase {
  name: string
}

export default function Postgres_MapPools(session: Pool): PostgresModel<DbMapPool> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'map_pools', input, ['id']),
    clear: () => delete_from(session, 'map_pools'),
  } as PostgresModel<DbMapPool>
}
