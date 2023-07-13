import mongoose, { Schema, Document, Types } from 'mongoose'
import { RegistrationStateDocument, SubscriptionDocument } from '@core/repositories/database/models/registration.state.model';
export interface RestaurantDocument extends Document {
    _id: Types.ObjectId,
    key: string,
    name: string,
    description: string,
    address: string,
    attentionSchedule: string,
    phone: string,
    email: string,
    urlImageLogo: string,
    ownDelivery: Boolean,
    showInApp: Boolean,
    paymentMethods: [{ paymentMethod: string }],
    subscription: SubscriptionDocument,
    registrationState: RegistrationStateDocument
}

const RestaurantSchema: Schema = new Schema({
    key: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    description: { type: String },
    address: { type: String },
    attentionSchedule: { type: String },
    phone: { type: String },
    email: { type: String },
    urlImageLogo: { type: String },
    ownDelivery: { type: Boolean },
    showInApp: { type: Boolean },
    paymentMethods: [{ paymentMethod: { type: String } }],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'subscription' },
    registrationState: { type: mongoose.Schema.Types.ObjectId, ref: 'RegistrationState' }
})

export const RestaurantModel = mongoose.models.Restaurant || mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema, 'Restaurant')