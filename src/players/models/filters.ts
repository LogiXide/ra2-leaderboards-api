import { PlayerSortOption, TeamSortOption } from './enums.js'
import { SortDirection } from '../../core/models/index.js'

export interface IPlayersWhere {
  id_EQUALS?: number
  name_STARTS_WITH?: string
}

export interface IPlayersOptions {
  sort?: IMapsSortOptions
  offset?: number
  limit?: number
}

export interface IMapsSortOptions {
  option: PlayerSortOption
  direction: SortDirection
}

export interface ITeamsWhere {
  id_EQUALS?: number
  name_STARTS_WITH?: string
}

export interface ITeamsOptions {
  sort?: ITeamsSortOptions
  offset?: number
  limit?: number
}

export interface ITeamsSortOptions {
  option: TeamSortOption
  direction: SortDirection
}
