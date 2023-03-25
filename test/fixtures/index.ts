import path from 'path'
import fs from 'fs'

import { Models } from '../db/index.js'
import { Ref } from '../utils/TestDataBuilder.js'
import { Fixture } from './types.js'

const exclude = [
  'index.ts',
  'types.ts',
]

function readDir(dir: string, rootDir: string): string[] {
  return fs.readdirSync(dir)
    .filter((p) => !exclude.includes(p))
    .flatMap(p => {
      if (p.endsWith('.ts')) {
        return path.join(dir, p).replace(rootDir, '').replace('.ts', '')
      }

      if (p.endsWith('.json')) {
        return []
      }

      return readDir(path.join(dir, p), rootDir)
    })
}

function initFixtures(models: Models, ref: Ref) {
  return readDir(__dirname, __dirname + '/')
    .reduce((fixtures, p) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      fixtures[p.replace('.fixture', '')] = require(`./${p}`).default(models, ref) as Fixture
      return fixtures
    }, {} as any)
}

export default initFixtures

export * from './types.js'
