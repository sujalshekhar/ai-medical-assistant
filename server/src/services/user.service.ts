import { createUser, getUserByEmail, getUserById } from "../repositories/user.repository";
import { User } from "../types/model.type";
import { generateToken, hashPassword, verifyPassword } from "../utils";
import { ApiError } from "../utils/apiError";

const createUserService = async (userData: User): Promise<Boolean> => {
    const hashedPassword = await hashPassword(userData.password);
    const user = await createUser({...userData, password: hashedPassword });
    console.log('User created successfully:', user);
    return true;
}

const loginUserService = async (email: string, password: string): Promise<User & { token: string } | null> => {
    const user = await getUserByEmail(email);
    if(!user) {
        console.log('User not found with email:', email);
        throw new ApiError(404, 'User not found');
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if(!isPasswordValid) {
        console.log('Invalid password for user:', email);
        throw new ApiError(401, 'Invalid password');
    }
    const token = generateToken({ id: user._id, email: user.email });
    console.log('User logged in successfully:', user.email);
    return { ...user, token };
}

const getUserByIdService = async (_id: string): Promise<User | null> => {
    const user = await getUserById(_id);
    if(!user) {
        console.log('User not found with ID:', _id);
        throw new ApiError(404, 'User not found');
    }
    console.log('User retrieved successfully:', user.email);
    return user;
}

export { createUserService, loginUserService, getUserByIdService };