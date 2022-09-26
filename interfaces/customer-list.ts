export interface CustomerListResponse {
    paginationInfo: PaginationInfo;
    items: Customer[];
}

export interface Customer {
    id: number,
    email: string,
    first: string,
    last: string,
    company: string,
    created_at: Date,
    country: string
}

export interface PaginationInfo {
    totalItems: number,
    pageSize: number,
    currentPage: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    nextPageNumber: number,
    previousPageNumber: number
}
