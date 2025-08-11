import { ApiError } from '../utils/apiError';
import { config } from './config';
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        const dbUri = config.mongodbUri;
        console.log(`Connecting to database at ${dbUri}`);
        await mongoose.connect(dbUri, {dbName: 'ai-medical-assistant'});
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new ApiError(500, 'Failed to connect to the database');
    }
}