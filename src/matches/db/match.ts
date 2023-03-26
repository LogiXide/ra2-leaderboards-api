import { Model, Table, Column, BelongsTo } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'

import { Player } from '../../players/db/player.js'
import { Team } from '../../players/db/team.js'

@Table
export class Match extends Model {
  @Column
    type!: string

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
