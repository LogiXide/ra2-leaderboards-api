import "@types/jest"
import "jest-extended"

type TestHelpers = {
	create_postgres_fixtures: (ctx: any, fixtures: string[]) => Promise<void>
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

declare global {
	namespace jest {
		interface Matchers<R> {

		}
	}
}
