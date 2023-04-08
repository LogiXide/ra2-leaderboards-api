import { Model, Table, Column, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { ITeamPlayerAttributes, ITeamPlayerCreationAttributes } from '../models/index.js'
import { Team } from './team.js'
import { Player } from './player.js'

@Table({ tableName: 'teams_players' })
export class TeamPlayer extends Model<ITeamPlayerAttributes, ITeamPlayerCreationAttributes> {
  @ForeignKey(() => Team)
  @Column
    teamId!: number

  @ForeignKey(() => Player)
  @Column
    playerId!: number

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date
}
