import { Model, Table, Column, BelongsToMany } from 'sequelize-typescript'
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { MapPoolMap } from './map-pool-map.js'
import { MapPool } from './map-pool.js'

@Table
export class Map extends Model<
  InferAttributes<Map>,
  InferCreationAttributes<Map>
> {
  declare id: CreationOptional<number>;
  declare value: number;

  declare static paginate: (
    options: PaginateOptions<Map>,
  ) => Promise<PaginationConnection<Map>>;

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
}
