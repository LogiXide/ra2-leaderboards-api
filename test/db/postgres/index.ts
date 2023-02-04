import pg from "pg"

export const init_postgres_session = () => new pg.Pool({
  user: "postgres",
  database: "postgres",
  password: "killmenot",
  port: 5432,
  host: "localhost",
})
