import { Ref } from "../utils/TestDataBuilder.js"

export default (models: any, ref: Ref) => {
	const Map = models.Postgres_Maps
  const MapPool = models.Postgres_MapPools
  const MapPoolMap = models.Postgres_MapPoolMaps

	const maps = [
    {
      name: "tiburon",
      model: Map,
      data: {
        name: "Tiburon",
        spots: 4,
        author: "JaladTanaga / Burg",
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: "snow_valley",
      model: Map,
      data: {
        name: "Snow Valley TL v BR",
        spots: 2,
        author: "Westwood Studios",
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: "dannath",
      model: Map,
      data: {
        name: "Dannath",
        spots: 2,
        author: "JaladTanaga",
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: "estaminia",
      model: Map,
      data: {
        name: "Estaminia",
        spots: 2,
        author: "[RU]Poluy",
        image_url: 'https://tempuri.org',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
	]

  const mapPools = [
    {
      name: "ra2",
      model: MapPool,
      data: {
        name: "Red Alert 2",
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: "yr",
      model: MapPool,
      data: {
        name: "Yuri's Revenge",
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
	]

  const mapPoolMaps = [
    ...[
      // Yuri's Revenge
      {
        map_pool_id: ref("yr.id"),
        map_id: ref("tiburon.id"),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        map_pool_id: ref("yr.id"),
        map_id: ref("snow_valley.id"),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      // Red Alert 2
      {
        map_pool_id: ref("ra2.id"),
        map_id: ref("dannath.id"),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
      {
        map_pool_id: ref("ra2.id"),
        map_id: ref("estaminia.id"),
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    ].map((data, index) =>
      ({
        name: `map_pool_map_${index}`,
        model: MapPoolMap,
        data,
      })
    ),
	]

	return {
		require: [],
		data: [
			...maps,
      ...mapPools,
      ...mapPoolMaps,
		],
	}
}
