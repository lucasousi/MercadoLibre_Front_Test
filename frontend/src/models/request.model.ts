export interface PaginatedRequest {
	offset: string | number;
	limit: string | number;
	sort?: string;
}
