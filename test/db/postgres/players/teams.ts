import { Pool } from 'pg'
import { insert_into, delete_from } from '../base.js'

export default function Postgres_Teams(session: Pool) {
  return {
    create: async (input: Record<string, object>) => insert_into(session, 'teams', input, ['id']),
    clear: () => delete_from(session, 'teams'),
  }
}
