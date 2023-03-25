import { delegateToSchema } from '@graphql-tools/delegate'
import { TransformQuery } from '@graphql-tools/wrap'
import _ from 'lodash'
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
    info: GraphQLResolveInfo,
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

    const response = await delegateToSchema({
      schema: info.schema,
      operation: OperationTypeNode.QUERY,
      fieldName: 'mapPool',
      args: {
        id: mapPool?.id,
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
      mapPools: response ? [response] : null,
    }
  },
}

export default mapPoolsMutations
