import { GameSortOption, MatchSortOption } from './enums.js'
import { SortDirection } from '../../core/models/index.js'

export interface IGamesWhere {
  id_EQUALS?: number
  name_STARTS_WITH?: string
}

export interface IGamesOptions {
  sort?: IGamesSortOptions
  offset?: number
  limit?: number
}

export interface IGamesSortOptions {
  option: GameSortOption
  direction: SortDirection
}

export interface IMatchesWhere {
  id_EQUALS?: number
  name_STARTS_WITH?: string
}

export interface IMatchesOptions {
  sort?: IMatchesSortOptions
  offset?: number
  limit?: number
}

export interface IMatchesSortOptions {
  option: MatchSortOption
  direction: SortDirection
}
