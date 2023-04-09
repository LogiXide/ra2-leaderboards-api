import { Model, Table, Column, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { IPlayerAttributes, IPlayerCreationAttributes } from '../models/index.js'
import { TeamPlayer } from './team-player.js'
import { Team } from './team.js'

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

  @BelongsToMany(() => Team, () => TeamPlayer)
    teams?: Team[]

  declare static paginate: (options: PaginateOptions<Player>) => Promise<PaginationConnection<Player>>
}
