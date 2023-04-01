import { Model, Table, Column, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { ITeamPlayerAttributes, ITeamPlayerpCreationAttributes } from '../models/index.js'
import { Player } from './player.js'
import { Team } from './team.js'

@Table({ tableName: 'teams_players' })
export class TeamPlayer extends Model<ITeamPlayerAttributes, ITeamPlayerpCreationAttributes> {
  @ForeignKey(() => Player)
  @Column
    playerId!: number

  @ForeignKey(() => Team)
  @Column
    teamId!: number

  @CreatedAt
  @Column
    createdAt!: Date

  @UpdatedAt
  @Column
    updatedAt!: Date
}
