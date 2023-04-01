import { Optional } from 'sequelize'

export interface IGameAttributes {
  id: number;
  type: string;
  winner: string;
  matchId: number;
  mapId: number
  homePlayerId?: number;
  homeTeamId?: number;
  awayPlayerId?: number;
  awayTeamId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMatchAttributes {
  id: number;
  type: string;
  winner?: string;
  homePlayerId?: number;
  homeTeamId?: number;
  awayPlayerId?: number;
  awayTeamId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGameCreationAttributes extends Optional<IGameAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IMatchCreationAttributes extends Optional<IMatchAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

