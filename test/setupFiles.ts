import _ from "lodash"
import { GraphQLClient } from "graphql-request"
import { Pool } from "pg"
import initFixtures, { Context } from "./fixtures/index.js"
import models from "./db/index.js"
import initSession from "./db/postgres/session.js"
import TestDataBuilder, { Realm } from "./utils/TestDataBuilder.js"

const url = "http://localhost:4000/graphql"
const graphqlClient = new GraphQLClient(url, {
	headers: {
		contentType: "application/json"
	},
})

const fixtures = initFixtures(models, TestDataBuilder.ref)

function getDependencies(keys: string[]): string[] {
	const result = _.chain(fixtures)
		.pick(keys)
		.map((x: any) => x.require)
		.flatten()
		.concat(keys)
		.uniq()
		.value()

	return keys.length === result.length ? result : getDependencies(result)
}

// Postgres helpers
async function clear_postgres_db(session: Pool) {
	const tasks = [
    models.Postgres_MapPoolMaps,
    models.Postgres_MapPools,
		models.Postgres_Maps,
	]

	for (const task of tasks) {
		await task(session).clear()
	}
}

async function create_postgres_fixtures(context: Context, predefined: string[]) {
	predefined = predefined || []

	const session = initSession()
	const builder = getDependencies(predefined)
		.reduce((arr, key) => arr.concat(fixtures[key].data), [])
		.reduce((builder, fixture: any) => {
			return builder.define(
				fixture.name,
				fixture.model,
				fixture.data,
				fixture.args,
        fixture.options,
			)
		}, new TestDataBuilder(session, Realm.Postgres))

	try {
		await clear_postgres_db(session)
		await builder.buildTo(context)
	} catch (err) {
		console.error(err)
		throw err
	} finally {
		await session.end()
	}
}

// async function run_postgres_query(query: string, params?: unknown[]) {
// 	try {
// 		const result = await pg_session.query(query, params)
// 		return result
// 	} catch (err) {
// 		console.error(
// 			"Cannot execute postgres query %s\nPayload: %j\nMessage:%s\nDetails: %j",
// 			query,
// 			params,
// 			err.message,
// 			err.details
// 		)
// 	}
// }

global.graphqlClient = graphqlClient
global.testHelpers = {
	create_postgres_fixtures,
}
