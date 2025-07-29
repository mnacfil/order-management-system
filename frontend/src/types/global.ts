// For structuring the API response
export interface ApiResponse<T> {
  status: string;
  data?: T;
  results?: number;
  message?: string;
}
