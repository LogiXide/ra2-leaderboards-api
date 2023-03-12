import { Model, Table, Column } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'

@Table
export class Team extends Model {
  @Column
  name!: string

  declare static paginate: (options: PaginateOptions<Team>) => Promise<PaginationConnection<Team>>
}
