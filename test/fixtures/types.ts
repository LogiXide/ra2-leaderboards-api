import { Models, PostgresModelFunction } from '../db/index.js'
import { Ref } from '../utils/TestDataBuilder.js'

export type Context = any

export type Fixture = {
  require: any[]
  data: FixtureItem[]
}

export type FixtureItem<T = any> = {
  name: string
  model: PostgresModelFunction<T>
  data: any
}

export type FixtureFunction = (models: Models, ref: Ref) => Fixture
