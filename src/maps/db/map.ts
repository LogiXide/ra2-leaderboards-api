import { Model, Table, Column, BelongsToMany } from 'sequelize-typescript'
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelizeCursorPagination from 'sequelize-cursor-pagination'
import type { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { MapPoolMap } from './map-pool-map.js'
import { MapPool } from './map-pool.js'

//const  = sequelizeCursorPagination
// { PaginateOptions, PaginationConnection, makePaginate }

@Table
export class Map extends Model<
  InferAttributes<Map>,
  InferCreationAttributes<Map>
> {
  declare id: CreationOptional<number>;
  declare value: number;

  @Column
  name!: string

  @Column
  spots!: number

  @Column
  author!: string

  @Column
  imageUrl!: string

  @BelongsToMany(() => MapPool, () => MapPoolMap)
  mapPools!: MapPool[]

  static paginate = (options: PaginateOptions<Map>) => sequelizeCursorPagination.makePaginate(Map);
}

//Map.paginate = sequelizeCursorPagination.makePaginate(Map);
