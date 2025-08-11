import mongoose, { Document, Schema } from "mongoose";
import { User } from "../types/model.type";

const UserSchema: Schema = new Schema<User>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default mongoose.model<User>("User", UserSchema);
