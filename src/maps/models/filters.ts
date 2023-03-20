import { MapSortOption, MapPoolSortOption } from './enums.js'
import { SortDirection } from '../../core/models/index.js'

export interface IMapsWhere {
  name_STARTS_WITH?: string;
}

export interface IMapsOptions {
  sort?: IMapsSortOptions;
  offset?: number;
  limit?: number;
}

export interface IMapsSortOptions {
  option: MapSortOption;
  direction: SortDirection;
}

export interface IMapPoolsWhere {
  name_STARTS_WITH?: string;
}

export interface IMapPoolsOptions {
  sort?: IMapPoolsSortOptions;
  offset?: number;
  limit?: number;
}

export interface IMapPoolsSortOptions {
  option: MapPoolSortOption;
  direction: SortDirection;
}
