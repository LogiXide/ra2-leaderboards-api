import { PaginationResponse } from '../../core/models/index.js'
import { PaginationEdge } from 'sequelize-cursor-pagination'

export const edgesToPaginationResponse = <T>(
  edges: PaginationEdge<T>[],
  totalCount: number,
  offset: number,
  size: number,
): PaginationResponse<T> => {
  return {
    data: edges.map((it) => it.node),
    pageNumber: offset > 0 ? offset / offset + 1 : 1,
    size,
    totalCount,
    totalPages: Math.ceil(totalCount / size),
  }
}

export const entityToPaginationResponse = <T>(
  node: T | null,
): PaginationResponse<T> => {
  return {
    data: node ? [node] : [],
    pageNumber: 1,
    size: 1,
    totalCount: node ? 1 : 0,
    totalPages: 1,
  }
}
