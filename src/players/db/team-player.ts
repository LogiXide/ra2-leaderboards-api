import { Model, Table, Column, ForeignKey } from 'sequelize-typescript'
import { Player } from './player.js'
import { Team } from './team.js'

@Table({ tableName: 'teams_players' })
export class TeamPlayer extends Model {
  @ForeignKey(() => Player)
  @Column
  playerId!: number;

  @ForeignKey(() => Team)
  @Column
  teamId!: number;
}
