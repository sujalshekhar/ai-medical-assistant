import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/apiError';
import { createUserService, getUserByIdService, loginUserService } from '../services/user.service';

const createUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        console.log('Creating user with data: ', userData);
        // Assuming you have a service to handle user creation
        const user = await createUserService(userData);
        return res.status(201).json(successResponse(null, 'User created successfully', 201));
    } catch (error) {
        console.error('Error creating user: ', error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json(errorResponse(error, error.message, error.statusCode));
        }
        return res.status(500).json(errorResponse(new ApiError(500, 'Internal Server Error'), 'An unexpected error occurred', 500));
    }
}

const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('Logging in user with email: ', email);
        // Assuming you have a service to handle user login
        const user = await loginUserService(email, password);
        return res.status(200).json(successResponse(user, 'User logged in successfully', 200));
    } catch (error) {
        console.error('Error logging in user: ', error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json(errorResponse(error, error.message, error.statusCode));
        }
        return res.status(500).json(errorResponse(new ApiError(500, 'Internal Server Error'), 'An unexpected error occurred', 500));
    }
}

const getUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        console.log('Retrieving user with ID: ', userId);
        const user = await getUserByIdService(userId);
        return res.status(200).json(successResponse(user, 'User retrieved successfully', 200));
    } catch (error) {
        console.error('Error retrieving user by ID: ', error);
        if(error instanceof ApiError) {
            return res.status(error.statusCode).json(errorResponse(error, error.message, error.statusCode));
        }
        return res.status(500).json(errorResponse(new ApiError(500, 'Internal Server Error'), 'An unexpected error occurred', 500));
    }
}

export { createUserController, loginUserController, getUserController };