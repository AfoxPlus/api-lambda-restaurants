import { RegistrationState } from "@core/entities/RegistrationState";

export interface Restaurant {
    code: string,
    name: string,
    description: string,
    phone: string,
    email?: string,
    urlImageLogo: string,
    ownDelivery: Boolean,
    registrationState: RegistrationState
}