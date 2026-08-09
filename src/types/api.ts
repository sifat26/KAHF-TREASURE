export interface ApiResponse<TData = unknown> {
  statusCode?: number;
  success: boolean;
  message: string;
  data: TData;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}
