import { Context } from '../../types.js'
import { PaginationResponse } from '../../core/models/index.js'
import { toPaginationResponse } from '../../core/utils/pagination.js'
import { ITeamsWhere, ITeamsOptions } from '../models/index.js'
import { Team } from '../db/team.js'

interface ITeamsArgs {
  where?: ITeamsWhere;
  options?: ITeamsOptions;
}

interface ITeamArgs {
  id: number;
}

const teamsQueries = {
  teams: async (parent: unknown, args: ITeamsArgs, context: Context): Promise<PaginationResponse<Team>> => {
    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0

    const { edges, totalCount } = await context.db.teams.paginate({
      order: [['id', 'ASC']],
      limit,
      offset,
    })

    return toPaginationResponse(edges, totalCount, offset, limit)
  },
  team: async (parent: unknown, args: ITeamArgs, context: Context): Promise<Team | null> => {
    const team = await context.db.teams.findByPk(args.id)

    return team
  },
}

export default teamsQueries
