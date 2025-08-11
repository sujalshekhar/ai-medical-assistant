import bcrypt from 'bcrypt';
import { config } from '../config/config';
import jwt from 'jsonwebtoken';

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(config.saltRounds);
    return await bcrypt.hash(password, salt);
}

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

const generateToken = (payload: object): string => {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    return token;
}

const verifyToken = (token: string): object | null => {
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (typeof decoded === 'string') {
            return null;
        }
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export { hashPassword, verifyPassword, generateToken, verifyToken };