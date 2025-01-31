import mongoose, { Schema } from 'mongoose';
import { IUrl } from '../types/types';
const urlSchema = new Schema<IUrl>({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    topic: { type: String, },
    customAlias: { type: String, },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Url = mongoose.model<IUrl>('Url', urlSchema);