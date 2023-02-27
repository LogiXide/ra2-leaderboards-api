import { PaginationResponse } from "../../core/models/index.js";
import { PaginationEdge } from "sequelize-cursor-pagination";

export const toPaginationResponse = <T>(edges: PaginationEdge<T>[], totalCount: number, offset: number, size: number): PaginationResponse<T> => {
  return {
    data: edges.map(it => it.node),
    pageNumber: offset > 0 ? offset / offset + 1 : 1,
    size,
    totalCount,
    totalPages: Math.ceil(totalCount / size),
  };
};
