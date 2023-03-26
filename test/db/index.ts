import path from 'path'
import fs from 'fs'

import { PostgresModelFunction } from './postgres/types.js'
import { DbMapPoolMap, DbMapPool, DbMap } from './postgres/maps/index.js'
import { DbMatch } from './postgres/matches/index.js'
import { DbPlayer, DbTeamPlayer, DbTeam } from './postgres/players/index.js'

export interface Models extends Record<string, PostgresModelFunction>  {
  Postgres_Maps: PostgresModelFunction<DbMap>
  Postgres_MapPools: PostgresModelFunction<DbMapPool>
  Postgres_MapPoolsMaps: PostgresModelFunction<DbMapPoolMap>
  Postgres_Matches: PostgresModelFunction<DbMatch>
  Postgres_Players: PostgresModelFunction<DbPlayer>
  Postgres_Teams: PostgresModelFunction<DbTeam>
  Postgres_TeamsPlayers: PostgresModelFunction<DbTeamPlayer>
}

const exclude = [
  'index.ts',
  'base.ts',
  'session.ts',
  'types.ts',
]

function readDir(targetDir: string, rootDir: string): string[] {
  return fs.readdirSync(targetDir)
    .filter((file) => !exclude.includes(file))
    .flatMap((file: string) => {
      if (file.endsWith('.ts')) {
        return path.join(targetDir, file).replace(rootDir, '').replace('.ts', '')
      }

      return readDir(path.join(targetDir, file), rootDir)
    })
}

const models = readDir(__dirname, __dirname + '/')
  .reduce((models: Models, file: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(`./${file}`).default as unknown as PostgresModelFunction
    models[model.name] = model
    return models
  }, {} as Models)

export default models as Models

export * from './postgres/types.js'
