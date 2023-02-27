export interface PaginationResponse<T> {
  data: T[]
	pageNumber: number
  size: number
  totalCount: number
  totalPages: number
}
