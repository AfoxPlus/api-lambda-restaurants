import mongoose, { Document, Schema } from 'mongoose';
import { RestaurantDocument } from './restaurant.model';

export interface PartnerDocument extends Document {
    name: string;
    email: string;
    phone: string;
    restaurants: RestaurantDocument[]
}

const PartnerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],

}, { timestamps: true });

export const PartnerModel = mongoose.models.Message || mongoose.model<PartnerDocument>('Partner', PartnerSchema, 'Partner')
