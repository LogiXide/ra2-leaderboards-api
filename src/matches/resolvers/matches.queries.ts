import { Context } from '../../types.js'
import { PaginationResponse, SortDirection } from '../../core/models/index.js'
import { edgesToPaginationResponse, entityToPaginationResponse } from '../../core/utils/pagination.js'
import { IMatchesWhere, IMatchesOptions, MatchSortOption } from '../models/index.js'
import { Match } from '../db/match.js'

interface IMatchesArgs {
  where?: IMatchesWhere;
  options?: IMatchesOptions;
}

interface IMatchArgs {
  id: number;
}

const matchesQueries = {
  matches: async (parent: unknown, args: IMatchesArgs, context: Context): Promise<PaginationResponse<Match>> => {
    if (args.where?.id_EQUALS) {
      const game = await context.db.matches.findByPk(args.where?.id_EQUALS)

      return entityToPaginationResponse(game)
    }

    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0
    const sortColumn = args.options?.sort?.option || MatchSortOption.by_id
    const sortOrder = args.options?.sort?.direction || SortDirection.ASC

    const { edges, totalCount } = await context.db.matches.paginate({
      order: [[sortColumn, sortOrder]],
      limit,
      offset,
    })

    return edgesToPaginationResponse(edges, totalCount, offset, limit)
  },

  match: async (parent: unknown, args: IMatchArgs, context: Context): Promise<Match | null> => {
    const match = await context.db.matches.findByPk(args.id)

    return match
  },
}

export default matchesQueries
