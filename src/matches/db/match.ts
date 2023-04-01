import { Model, Table, Column, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { IMatchAttributes, IMatchCreationAttributes } from '../models/index.js'
import { Player } from '../../players/db/player.js'
import { Team } from '../../players/db/team.js'

@Table
export class Match extends Model<IMatchAttributes, IMatchCreationAttributes> {
  @Column
    type!: string

  @Column
    winner?: string

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  @BelongsTo(() => Player, 'homePlayerId')
    homePlayer?: Player

  @BelongsTo(() => Player, 'homeTeamId')
    homeTeam?: Team

  @BelongsTo(() => Player, 'awayPlayerId')
    awayPlayer?: Player

  @BelongsTo(() => Player, 'awayTeamId')
    awayTeam?: Team

  declare static paginate: (options: PaginateOptions<Match>) => Promise<PaginationConnection<Match>>
}
