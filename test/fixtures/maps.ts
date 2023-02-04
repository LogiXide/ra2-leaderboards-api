import { range } from "../utils/array-helpers"

export default (models: any) => {
	const Map = models.Postgres_Maps

	const maps = [
		...range(10).map(n =>
			({
				name: `map${n}`,
				model: Map,
				data: {
					name: `map${n}`,
					spots: 2,
					author: 'John Doe',
          image_url: 'https://tempuri.org',
          created_at: new Date(),
          updated_at: new Date(),
				},
			})
		),
	]

	return {
		require: [],
		data: [
			...maps,
		],
	}
}
