import { MapSortOption } from "./enums.js"
import { SortDirection } from "../../core/models/index.js"

export interface IMapsWhere {
  name_STARTS_WITH?: String
}

export interface IMapsOptions {
  sort?: IMapsSortOptions
	offset?: number
	limit?: number
}

export interface IMapsSortOptions {
  option: MapSortOption
	direction: SortDirection
}
