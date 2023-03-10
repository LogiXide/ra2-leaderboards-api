import _ from "lodash"
import DataLoader from "dataloader"
import { Op } from "sequelize"

import { MapPoolMap } from "../db/map-pool-map.js"
import { Db } from "../../types.js"

export const initMapPoolMapsByMapIdDataLoader = (db: Db) =>
	new DataLoader(
		async (mapIds: Readonly<number[]>): Promise<Array<MapPoolMap[]>> => {
      const mapPoolMaps = await MapPoolMap.findAll({
        where: {
          mapId: {
            [Op.in]: mapIds
          }
        }
      });

      const mapPoolMapsGrouped = _.groupBy(mapPoolMaps, it => it.mapId)
      const results = mapIds.map(mapId => mapPoolMapsGrouped[mapId] || [])

			return results
    }
	)

