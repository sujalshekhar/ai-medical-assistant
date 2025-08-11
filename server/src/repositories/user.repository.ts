import { UserModel } from "../models";
import { User } from "../types/model.type";

const createUser = async (userData: User): Promise<Boolean> => {
    const user = await UserModel.create(userData);
    return true;
}

const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.find({ email });
    return user.length > 0 ? user[0].toObject() as User : null;
}

const getUserById = async (_id: string): Promise<User | null> => {
    const user = await UserModel.findById(_id);
    return user ? user.toObject() as User : null;
}

export {createUser, getUserById, getUserByEmail};