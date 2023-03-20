import { Dialect } from 'sequelize'

const config = {
  development: {
    username: 'postgres',
    password: 'killmenot',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres' as Dialect
  },
  test: {
    username: 'postgres',
    password: 'killmenot',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres' as Dialect
  },
  production: {
    username: 'postgres',
    password: 'killmenot',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres' as Dialect
  }
}

export default config
