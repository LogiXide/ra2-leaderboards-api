import { Pool } from 'pg'

export interface DbBase {
  created_at: Date
  updated_at: Date
}

export interface PostgresModel<T = object> {
  create: (input: Record<string, object>) => Promise<T>
  clear: () => Promise<void>
}

export type PostgresModelFunction<T = DbBase> = (session: Pool) => PostgresModel<T>
