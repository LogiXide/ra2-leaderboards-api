import { Model, Table, Column, BelongsToMany } from 'sequelize-typescript'
import { MapPoolMap } from 'maps/db/map-pool-map.js'
import { MapPool } from 'maps/db/map-pool.js'

@Table
export class Map extends Model {
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
