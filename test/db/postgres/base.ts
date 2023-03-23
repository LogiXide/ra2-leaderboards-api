import { Pool } from 'pg'

export async function query(session: Pool, query: string) {
  await session.query(query)
}

export async function insert_into<T = object>(session: Pool, table: string, input: Record<string, object>, returning: string[] = []) {
  const columns = Object.keys(input)
  const values = columns.map((key: string, i: number) => `$${i + 1}`)

  const query = `
    INSERT INTO ${table} (${columns})
    VALUES (${values})
    RETURNING ${returning.concat(columns).join(', ')};
  `
  const params = columns.map((key: string) => input[key])
  const result = await session.query(query, params)

  return result.rows[0] as T
}

export async function delete_from(session: Pool, table: string) {
  await session.query(`DELETE FROM ${table};`)
}
