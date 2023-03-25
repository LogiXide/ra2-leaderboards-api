import { delegateToSchema } from '@graphql-tools/delegate'
import { TransformQuery, WrapQuery } from '@graphql-tools/wrap'
import { FieldNode, GraphQLResolveInfo, OperationTypeNode, SelectionSetNode } from 'graphql'
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
    info: GraphQLResolveInfo,
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

    const response = await delegateToSchema({
      schema: info.schema,
      operation: OperationTypeNode.QUERY,
      fieldName: 'mapPool',
      args: {
        id: mapPool.id,
      },
      context,
      info,
      transforms: [
        new TransformQuery<Context>({
          path: ['mapPool'],
          queryTransformer: (selectionSet) => {
            return (selectionSet?.selections[0] as FieldNode).selectionSet as SelectionSetNode
          },
        })
      ],
    }) as MapPool

    return {
      mapPools: [response],
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
