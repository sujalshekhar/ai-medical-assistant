import { ApiError } from "../utils/apiError";

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: ApiError;
    statusCode: number;
}
