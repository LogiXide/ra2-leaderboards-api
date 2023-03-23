import path from 'path'
import fs from 'fs'

import { Ref } from '../utils/TestDataBuilder.js'

export type Context = any

const exclude = [
  'index.ts',
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

function initFixtures(models: any, ref: Ref) {
  return readDir(__dirname, __dirname + '/')
    .reduce((fixtures, p) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      fixtures[p.replace('.fixture', '')] = require(`./${p}`).default(models, ref)
      return fixtures
    }, {} as any)
}

export default initFixtures
