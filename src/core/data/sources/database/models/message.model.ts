import mongoose, { Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
    name: string;
    email: string;
    message: string;
}

const MessageSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
}, { timestamps: true });

export const MessageModel = mongoose.models.Message || mongoose.model<MessageDocument>('Message', MessageSchema, 'Message')
