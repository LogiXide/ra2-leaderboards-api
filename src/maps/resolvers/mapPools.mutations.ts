import { Context } from '../../types.js'
import { MapPool } from '../db/map-pool.js'

interface ICreateMapPoolArgs {
  input: {
    name: string;
  };
}

interface ICreateMapPoolResponse {
  mapPools: MapPool[];
}

interface IUpdateMapPoolArgs {
  id: number;
  input: {
    name: string;
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
    await mapPool?.update(args.input)

    return {
      mapPools: mapPool ? [mapPool] : null,
    }
  },
}

export default mapPoolsMutations
