import { MapSortOption } from "./enums.js"
import { SortDirection } from "../../core/models/index.js"

export interface MapsWhere {
  name_STARTS_WITH?: String
}

export interface MapsOptions {
  sort?: MapsSortOptions
	offset?: number
	limit?: number
}

export interface MapsSortOptions {
  option: MapSortOption
	direction: SortDirection
}
