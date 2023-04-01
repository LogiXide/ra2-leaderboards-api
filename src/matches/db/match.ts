import { Model, Table, Column, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript'
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

  @ForeignKey(() => Player)
    homePlayerId?: number

  @BelongsTo(() => Player, 'homePlayerId')
    homePlayer?: Player

  @ForeignKey(() => Team)
    homeTeamId!: number

  @BelongsTo(() => Team, 'homeTeamId')
    homeTeam?: Team

  @ForeignKey(() => Player)
    awayPlayerId?: number

  @BelongsTo(() => Player, 'awayPlayerId')
    awayPlayer?: Player

  @ForeignKey(() => Team)
    awayTeamId?: number

  @BelongsTo(() => Team, 'awayTeamId')
    awayTeam?: Team
  declare static paginate: (options: PaginateOptions<Match>) => Promise<PaginationConnection<Match>>
}
