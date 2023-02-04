import pg from "pg"

const initSession = () => new pg.Pool({
  user: "postgres",
  database: "postgres",
  password: "killmenot",
  port: 5432,
  host: "localhost",
})

export default initSession
