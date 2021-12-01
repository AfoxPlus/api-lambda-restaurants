import mongoose, { Schema, Document, Types } from 'mongoose'

export interface RegistrationStateDocument extends Document {
    _id: Types.ObjectId,
    code: string,
    state: string
}

const RegistrationStateSchema: Schema = new Schema({
    code : {type: String, require: true}, 
    state : {type: String, require: true} 
})

export const RegistrationStateModel = mongoose.models.RegistrationState || mongoose.model<RegistrationStateDocument>('RegistrationState', RegistrationStateSchema, 'RegistrationState')