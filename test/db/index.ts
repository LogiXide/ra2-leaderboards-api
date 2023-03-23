import path from 'path'
import fs from 'fs'

export type Models = any

const exclude = [
  'index.ts',
  'base.ts',
  'session.ts',
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
    const model = require(`./${file}`).default
    models[model.name] = model
    return models
  }, {} as Models)

export default models as Models
