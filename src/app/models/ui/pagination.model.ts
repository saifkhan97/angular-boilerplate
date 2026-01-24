/**
 * Pagination state model
 * Used by table & list pages
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}
