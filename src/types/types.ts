import { Document } from "mongoose";
export interface IUser extends Document {
    googleId: string;
    name: string;
    email: string;
    picture?: string;
  }