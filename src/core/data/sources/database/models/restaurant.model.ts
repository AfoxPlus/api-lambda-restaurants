import mongoose, { Schema, Document, Types } from 'mongoose'
import { RegistrationStateDocument, SubscriptionDocument } from '@core/data/sources/database/models/registration.state.model';
export interface RestaurantDocument extends Document {
    _id: Types.ObjectId,
    key: string,
    name: string,
    type: string,
    description: string,
    address: string,
    phone: string,
    email?: string,
    urlImageLogo: string,
    urlImageBanner?: string,
    ownDelivery: Boolean,
    showInApp: Boolean,
    location: { latitude: number, longitude: number },
    userRatingCount?: number,
    rating?: number,
    googleMapsUri?: string,
    websiteUri?: string,
    types: [{ name: string }]
    paymentMethods: [{ paymentMethod: string, isDefaultSelected: Boolean }],
    regularOpeningHours?: [{ weekdayDescription: string }],
    postalCode?: string,
    areaLevel1: string,
    areaLevel2: string,
    country: string,
    photos: [{
        name: string
        widthPx?: number
        heightPx?: number
    }],
    subscription: SubscriptionDocument,
    registrationState: RegistrationStateDocument
}

const RestaurantSchema: Schema = new Schema({
    key: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    type: { type: String },
    description: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    urlImageLogo: { type: String },
    urlImageBanner: { type: String },
    ownDelivery: { type: Boolean },
    showInApp: { type: Boolean },
    location: { latitude: { type: Number }, longitude: { type: Number } },
    userRatingCount: { type: Number },
    rating: { type: Number },
    googleMapsUri: { type: String },
    websiteUri: { type: String },
    types: [{ name: { type: String } }],
    paymentMethods: [{ paymentMethod: { type: String }, isDefaultSelected: { type: Boolean, default: false } }],
    regularOpeningHours: [{ weekdayDescription: { type: String } }],
    postalCode: { type: String },
    areaLevel1: { type: String },
    areaLevel2: { type: String },
    country: { type: String },
    photos: [{ name: { type: String }, widthPx: { type: String }, heightPx: { type: String } }],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'subscription' },
    registrationState: { type: mongoose.Schema.Types.ObjectId, ref: 'RegistrationState' }
})

export const RestaurantModel = mongoose.models.Restaurant || mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema, 'Restaurant')