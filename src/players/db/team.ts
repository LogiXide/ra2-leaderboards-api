import { Model, Table, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { ITeamAttributes, ITeamCreationAttributes } from '../models/index.js'

@Table
export class Team extends Model<ITeamAttributes, ITeamCreationAttributes> {
  @Column
    name!: string

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  declare static paginate: (options: PaginateOptions<Team>) => Promise<PaginationConnection<Team>>
}
