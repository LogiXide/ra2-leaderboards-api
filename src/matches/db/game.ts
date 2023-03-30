import { Model, Table, Column, BelongsTo } from 'sequelize-typescript'
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination'

import { Map } from '../../maps/db/map.js'
import { Player } from '../../players/db/player.js'
import { Team } from '../../players/db/team.js'

import { Match } from './match.js'

@Table
export class Game extends Model {
  @Column
    type!: string

  @Column
    winner!: string

  @Column
    matchId!: number

  @BelongsTo(() => Map, 'mapId')
    map!: Map

  @BelongsTo(() => Match, 'matchId')
    match!: Match

  @BelongsTo(() => Player, 'homePlayerId')
    homePlayer!: Player

  @BelongsTo(() => Player, 'homeTeamId')
    homeTeam!: Team

  @BelongsTo(() => Player, 'awayPlayerId')
    awayPlayer!: Player

  @BelongsTo(() => Player, 'awayTeamId')
    awayTeam!: Team

  declare static paginate: (options: PaginateOptions<Game>) => Promise<PaginationConnection<Game>>
}
