import { PlayerSortOption, TeamSortOption } from "./enums.js"
import { SortDirection } from "../../core/models/index.js"

export interface IPlayersWhere {
  name_STARTS_WITH?: String
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
  name_STARTS_WITH?: String
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
