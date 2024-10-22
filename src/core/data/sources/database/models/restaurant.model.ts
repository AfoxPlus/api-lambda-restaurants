import mongoose, { Schema, Document, Types } from 'mongoose'
import { RegistrationStateDocument, SubscriptionDocument } from '@core/data/sources/database/models/registration.state.model';

interface LocationDocument {
    type: 'Point';
    coordinates: [number, number];
}
export interface RestaurantDocument extends Document {
    _id: Types.ObjectId,
    key: string,
    name: string,
    primaryType: string,
    description: string,
    phone: string,
    email?: string,
    address: string,
    urlImageLogo: string,
    urlImageBanner?: string,
    ownDelivery?: boolean,
    isOnlyDelivery?: boolean,
    isVerified?: boolean,
    openNow?: boolean,
    showInApp?: boolean,
    userRatingCount?: number,
    rating?: number,
    googleMapsUri?: string,
    websiteUri?: string,
    postalCode?: string,
    areaLevel2?: string,
    areaLevel1?: string,
    country?: string,
    location: LocationDocument;
    types: [{ name: string }]
    paymentMethods: [{ paymentMethod: string, isDefaultSelected: Boolean }],
    regularOpeningHours?: [{ weekdayDescription: string }],
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
    primaryType: { type: String },
    description: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    urlImageLogo: { type: String },
    urlImageBanner: { type: String },
    ownDelivery: { type: Boolean },
    isOnlyDelivery: { type: Boolean },
    isVerified: { type: Boolean },
    openNow: { type: Boolean },
    showInApp: { type: Boolean },
    userRatingCount: { type: Number },
    rating: { type: Number },
    googleMapsUri: { type: String },
    websiteUri: { type: String },
    postalCode: { type: String },
    areaLevel2: { type: String },
    areaLevel1: { type: String },
    country: { type: String },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    types: [{ name: { type: String } }],
    paymentMethods: [{ paymentMethod: { type: String }, isDefaultSelected: { type: Boolean, default: false } }],
    regularOpeningHours: [{ weekdayDescription: { type: String } }],
    photos: [{ name: { type: String }, widthPx: { type: String }, heightPx: { type: String } }],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'subscription' },
    registrationState: { type: mongoose.Schema.Types.ObjectId, ref: 'RegistrationState' }
})

export const RestaurantModel = mongoose.models.Restaurant || mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema, 'Restaurant')