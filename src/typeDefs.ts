import { dirname, join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const gqlFiles = [
  'core',
  'maps',
  'matches',
  'players',
]
  .map((m) => join(__dirname, `./${m}/typedefs`))
  .flatMap((it) => readdirSync(it).map((filename) => join(it, filename)))

let typeDefs = ''

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(file, { encoding: 'utf8' })
})

export default typeDefs
