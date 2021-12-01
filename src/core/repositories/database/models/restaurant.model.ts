import mongoose, { Schema, Document, Types } from 'mongoose'
import { RegistrationStateDocument } from '@core/repositories/database/models/registration.state.model';
export interface RestaurantDocument extends Document {
    _id: Types.ObjectId,
    name: string,
    description: string,
    phone: string,
    email: string,
    urlImageLogo: string,
    registrationState: RegistrationStateDocument
}

const RestaurantSchema: Schema = new Schema({
    name : {type: String, require: true},
    description : {type: String},
    phone : {type: String},
    email : {type: String},
    urlImageLogo : {type: String},
    registrationState: { type: mongoose.Schema.Types.ObjectId, ref: 'RegistrationState' }
})

export const RestaurantModel = mongoose.models.Restaurant || mongoose.model<RestaurantDocument>('Restaurant', RestaurantSchema, 'Restaurant')