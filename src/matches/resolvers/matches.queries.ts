import { Context } from '../../types.js'
import { PaginationResponse } from '../../core/models/index.js'
import { toPaginationResponse } from '../../core/utils/pagination.js'
import { IMatchesWhere, IMatchesOptions } from '../models/index.js'
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
    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0

    const { edges, totalCount } = await context.db.matches.paginate({
      order: [['id', 'ASC']],
      limit,
      offset,
    })

    return toPaginationResponse(edges, totalCount, offset, limit)
  },
  match: async (parent: unknown, args: IMatchArgs, context: Context): Promise<Match | null> => {
    const match = await context.db.matches.findByPk(args.id)

    return match
  },
}

export default matchesQueries
