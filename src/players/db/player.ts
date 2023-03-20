import { Model, Table, Column } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'

@Table
export class Player extends Model {
  @Column
    name!: string

  declare static paginate: (options: PaginateOptions<Player>) => Promise<PaginationConnection<Player>>
}
