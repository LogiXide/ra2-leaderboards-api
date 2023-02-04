import { Model, Table, Column, BelongsToMany } from 'sequelize-typescript'
import { MapPoolMap } from 'maps/db/map-pool-map.js'
import { Map } from 'maps/db/map.js'

@Table
export class MapPool extends Model {
  @Column
  name!: string

  @BelongsToMany(() => Map, () => MapPoolMap)
  maps!: Map[];
}
