import { Model, Table, Column, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { IMapPoolAttributes, IMapPoolCreationAttributes } from '../models/index.js'
import { MapPoolMap } from './map-pool-map.js'
import { Map } from './map.js'

@Table
export class MapPool extends Model<IMapPoolAttributes, IMapPoolCreationAttributes> {
  @Column
    name!: string

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  @BelongsToMany(() => Map, () => MapPoolMap)
    maps?: Map[]

  declare static paginate: (options: PaginateOptions<MapPool>) => Promise<PaginationConnection<MapPool>>
}
