import { Pool } from "pg"
import { insert_into, delete_from } from "../base.js"

export default function Postgres_MapPoolsMaps(session: Pool) {
	return {
		create: async (input: Record<string, object>) => insert_into(session, "map_pools_maps", input, ["id"]),
		clear: () => delete_from(session, "map_pools_maps"),
	}
}
