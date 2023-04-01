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
    homePlayerId!: number

  @BelongsTo(() => Player)
    homePlayer?: Player

  @ForeignKey(() => Player)
    homeTeamId!: number

  @BelongsTo(() => Player)
    homeTeam?: Team

  @ForeignKey(() => Player)
    awayPlayerId!: number

  @BelongsTo(() => Player)
    awayPlayer?: Player

  @ForeignKey(() => Player)
    awayTeamID!: number

  @BelongsTo(() => Player)
    awayTeam?: Team

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date

  declare static paginate: (options: PaginateOptions<Game>) => Promise<PaginationConnection<Game>>
}

