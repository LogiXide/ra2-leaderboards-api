import { Model, Table, Column, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { ITeamAttributes, ITeamCreationAttributes } from '../models/index.js'
import { TeamPlayer } from './team-player.js'
import { Player } from './player.js'

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

  @BelongsToMany(() => Player, () => TeamPlayer)
    players?: Player[]

  declare static paginate: (options: PaginateOptions<Team>) => Promise<PaginationConnection<Team>>
}
