import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const verifiedToken = verifyToken(token);
    if (!verifiedToken) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = verifiedToken; // Attach user info to request object
    next();
}

export { validateUser };