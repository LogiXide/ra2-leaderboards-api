import _ from "lodash"
import DataLoader from "dataloader"
import { Op } from "sequelize"

import { MapPool } from "../db/map-pool.js"
import { Db } from "../../types.js"

export const initMapPoolsDataLoader = (db: Db) =>
	new DataLoader(
		async (ids: Readonly<number[]>): Promise<Array<MapPool>> => {
			const mapPoolMaps = await MapPool.findAll({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      });

      const mapPoolMapsIndexed = _.keyBy(mapPoolMaps, it => it.id);
      const results = ids.map(id => mapPoolMapsIndexed[id] as MapPool);

			return results;
    }
	)

