import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/types';
const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);