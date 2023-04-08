import { Op, WhereOptions } from 'sequelize'

import { Context } from '../../types.js'
import { PaginationResponse, SortDirection } from '../../core/models/index.js'
import { edgesToPaginationResponse, entityToPaginationResponse } from '../../core/utils/pagination.js'
import { ITeamsWhere, ITeamsOptions, TeamSortOption, ITeamAttributes } from '../models/index.js'
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
    if (args.where?.id_EQUALS) {
      const team = await context.db.teams.findByPk(args.where?.id_EQUALS)

      return entityToPaginationResponse(team)
    }

    const limit = args.options?.limit || 100
    const offset = args.options?.offset || 0
    const sortColumn = args.options?.sort?.option || TeamSortOption.by_id
    const sortOrder = args.options?.sort?.direction || SortDirection.ASC

    const where: WhereOptions<ITeamAttributes> = {}

    if (args.where?.name_STARTS_WITH) {
      where.name = {
        [Op.iLike]: `${args.where.name_STARTS_WITH.toLowerCase()}%`,
      }
    }

    const { edges, totalCount } = await context.db.teams.paginate({
      where,
      order: [[sortColumn, sortOrder]],
      limit,
      offset,
    })

    return edgesToPaginationResponse(edges, totalCount, offset, limit)
  },
  team: async (parent: unknown, args: ITeamArgs, context: Context): Promise<Team | null> => {
    const team = await context.db.teams.findByPk(args.id)

    return team
  },
}

export default teamsQueries
