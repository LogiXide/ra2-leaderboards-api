import { Model, Table, Column, ForeignKey } from 'sequelize-typescript'
import { MapPool } from './map-pool.js'
import { Map } from './map.js'

@Table({ tableName: 'map_pools_maps' })
export class MapPoolMap extends Model {
  @ForeignKey(() => MapPool)
  @Column
  mapPoolId!: number;

  @ForeignKey(() => Map)
  @Column
  mapId!: number;
}
