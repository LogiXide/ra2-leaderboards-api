/* eslint no-var: 0 */

import '@types/jest'
import 'jest-extended'
import { Context }  from './fixtures'

type TestHelpers = {
  create_postgres_fixtures: (ctx: Context, fixtures: string[]) => Promise<void>
}

declare global {
  namespace NodeJS {
    interface Global {
      graphqlClient: GraphQLClient
      testHelpers: TestHelpers
    }
  }

  var graphqlClient: GraphQLClient
  var testHelpers: TestHelpers
}
