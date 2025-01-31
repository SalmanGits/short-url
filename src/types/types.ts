import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IUrl extends Document {
  longUrl: string;
  customAlias?: string;
  shortUrl: string;
  topic?: string;
  user: mongoose.Schema.Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}