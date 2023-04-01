import { Model, Table, Column, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { IMapPoolMapAttributes, IMapPoolMapCreationAttributes } from '../models/index.js'
import { MapPool } from './map-pool.js'
import { Map } from './map.js'

@Table({ tableName: 'map_pools_maps' })
export class MapPoolMap extends Model<IMapPoolMapAttributes, IMapPoolMapCreationAttributes> {
  @ForeignKey(() => MapPool)
  @Column
    mapPoolId!: number

  @ForeignKey(() => Map)
  @Column
    mapId!: number

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date
}
