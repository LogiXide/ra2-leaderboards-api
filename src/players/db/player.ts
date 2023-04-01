import { Model, Table, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { IPlayerAttributes, IPlayerCreationAttributes } from '../models/index.js'

@Table
export class Player extends Model<IPlayerAttributes, IPlayerCreationAttributes> {
  @Column
    name!: string

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  declare static paginate: (options: PaginateOptions<Player>) => Promise<PaginationConnection<Player>>
}
