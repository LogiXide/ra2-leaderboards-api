import { Model, Table, Column, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { IMapAttributes, IMapCreationAttributes } from '../models/index.js'
import { MapPoolMap } from './map-pool-map.js'
import { MapPool } from './map-pool.js'

@Table
export class Map extends Model<IMapAttributes, IMapCreationAttributes> {
  @Column
    name!: string

  @Column
    spots!: number

  @Column
    author!: string

  @Column
    imageUrl!: string

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  @BelongsToMany(() => MapPool, () => MapPoolMap)
    mapPools?: MapPool[]

  declare static paginate: (options: PaginateOptions<Map>) => Promise<PaginationConnection<Map>>
}
