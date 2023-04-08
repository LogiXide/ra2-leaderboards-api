import { Optional } from 'sequelize'

export interface IMapAttributes {
  id: number
  name: string
  spots: number
  author: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface IMapPoolAttributes {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface IMapPoolMapAttributes {
  id: number
  mapPoolId: number
  mapId: number
  createdAt: Date
  updatedAt: Date
}

export interface IMapCreationAttributes extends Optional<IMapAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IMapPoolCreationAttributes extends Optional<IMapPoolAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IMapPoolMapCreationAttributes extends Optional<IMapPoolMapAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
