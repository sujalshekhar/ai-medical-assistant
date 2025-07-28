import { ApiResponse } from '../types/common.type';

export const successResponse = <T>(data: T, message?: string, statusCode = 200): ApiResponse<T> => {
	return {
        success: true,
        message,
        data,
        error: undefined,
        statusCode,
    }
}

export const errorResponse = (error: string, message?: string, statusCode = 500): ApiResponse<null> => {
    return {
        success: false,
        message,
        data: null,
        error,
        statusCode,
    }
}