import { Model, Table, Column, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'
import { IGameAttributes, IGameCreationAttributes } from '../models/index.js'

import { Map } from '../../maps/db/map.js'
import { Player } from '../../players/db/player.js'
import { Team } from '../../players/db/team.js'

import { Match } from './match.js'

@Table
export class Game extends Model<IGameAttributes, IGameCreationAttributes> {
  @Column
    type!: string

  @Column
    winner!: string

  @ForeignKey(() => Match)
    matchId!: number

  @BelongsTo(() => Match)
    match!: Match

  @ForeignKey(() => Map)
    mapId!: number

  @BelongsTo(() => Map)
    map!: Map

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

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  declare static paginate: (options: PaginateOptions<Game>) => Promise<PaginationConnection<Game>>
}

