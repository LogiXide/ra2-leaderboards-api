import _ from 'lodash'
import { Op } from 'sequelize'

import { Context } from '../../types.js'
import { MapPool } from '../db/map-pool.js'

interface ICreateMapPoolArgs {
  input: {
    name: string;
    mapIds?: number[];
  };
}

interface ICreateMapPoolResponse {
  mapPools: MapPool[];
}

interface IUpdateMapPoolArgs {
  id: number;
  input: {
    name: string;
    mapIds?: number[];
  };
}

interface IUpdateMapPoolResponse {
  mapPools: MapPool[] | null;
}

const mapPoolsMutations = {
  createMapPool: async (
    parent: unknown,
    args: ICreateMapPoolArgs,
    context: Context,
  ): Promise<ICreateMapPoolResponse> => {
    const mapPool = await context.db.mapPools.create(args.input)

    if (args.input.mapIds) {
      // TODO: validation
      const maps = await context.db.maps.findAll({
        where: {
          id: {
            [Op.in]: args.input.mapIds,
          }
        }
      })
      await mapPool.$add('maps', maps)
    }

    return {
      mapPools: [mapPool],
    }
  },

  updateMapPool: async (
    parent: unknown,
    args: IUpdateMapPoolArgs,
    context: Context,
  ): Promise<IUpdateMapPoolResponse> => {
    const mapPool = await context.db.mapPools.findByPk(args.id)

    if (mapPool) {
      await mapPool.update(args.input)

      if (args.input.mapIds) {
        // TODO: validation

        const existingMaps = await mapPool.$get('maps')
        const updatedMaps = await context.db.maps.findAll({
          where: {
            id: {
              [Op.in]: args.input.mapIds,
            }
          }
        })

        const addedMaps = _.differenceBy(updatedMaps, existingMaps, x => x.id)
        const removedMaps = _.differenceBy(existingMaps, updatedMaps, x => x.id)

        await mapPool.$add('maps', addedMaps)
        await mapPool.$remove('maps', removedMaps)
      }
    }

    return {
      mapPools: mapPool ? [mapPool] : null,
    }
  },
}

export default mapPoolsMutations
