import { RegistrationState } from "@core/domain/entities/RegistrationState";
import { Subscription } from "@core/domain/entities/Subscription";

export interface Restaurant {
    code?: string,
    key: string,
    name: string,
    type: string,
    description?: string,
    phone?: string,
    email?: string,
    address?: string,
    urlImageLogo: string,
    urlImageBanner?: string,
    ownDelivery?: Boolean,
    showInApp?: Boolean,
    paymentMethods?: PaymentMethod[],
    types?: Type[],
    location?: Location,
    userRatingCount?: number,
    rating?: number,
    googleMapsUri?: string,
    websiteUri?: string,
    regularOpeningHours?: RegularOpeningHours[],
    postalCode?: string,
    areaLevel2?: string,
    areaLevel1?: string,
    country?: string,
    photos?: Photo[],
    subscription?: Subscription,
    registrationState?: RegistrationState
}
export interface PaymentMethod {
    paymentMethod: string
}
export interface Location {
    latitude: number
    longitude: number
}

export interface RegularOpeningHours {
    weekdayDescription: string
}

export interface Photo {
    name: string
    widthPx: number
    heightPx: number
}

export interface Type {
    name: string
}