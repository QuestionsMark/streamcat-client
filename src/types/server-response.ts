export type Method = 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET';

// Typy backendowe
export interface ServerResponse {
    message: string;
}

export interface PaginationResponse<T> {
    results: T;
    count: number;
}

// Typy frontendowe
export interface ClientResponseOK<T> {
    status: true;
    results: T;
    count?: number;
}
export interface ClientResponseError {
    status: false;
    message: string;
}
export type ClientResponse<T> = ClientResponseOK<T> | ClientResponseError;
