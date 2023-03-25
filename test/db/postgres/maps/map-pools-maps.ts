import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'
import { DbBase, PostgresModel } from '../types.js'

export interface DbMapPoolMap extends DbBase {
  map_pool_id: number
  map_id: number
}

export default function Postgres_MapPoolsMaps(session: Pool): PostgresModel<DbMapPoolMap> {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'map_pools_maps', input, ['id']),
    clear: async () => delete_from(session, 'map_pools_maps'),
  } as PostgresModel<DbMapPoolMap>
}
