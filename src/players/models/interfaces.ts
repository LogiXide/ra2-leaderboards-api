import { Optional } from 'sequelize'

export interface IPlayerAttributes {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ITeamAttributes {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ITeamPlayerAttributes {
  id: number
  teamId: number
  playerId: number
  createdAt: Date
  updatedAt: Date
}

export interface IPlayerCreationAttributes extends Optional<IPlayerAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ITeamCreationAttributes extends Optional<ITeamAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ITeamPlayerCreationAttributes extends Optional<ITeamPlayerAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
