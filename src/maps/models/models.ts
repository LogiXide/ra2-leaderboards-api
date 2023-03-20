export interface IMapDto {
  id: number;
  name: number;
  spots: number;
  author: number;
  imageUrl: number;
  mapPools?: [IMapPoolDto];
}

export interface IMapPoolDto {
  id: number;
  name: number;
  mapPools?: [IMapDto];
}
