import { RegistrationState } from "@core/domain/entities/RegistrationState";
import { Subscription } from "@core/domain/entities/Subscription";

export interface Restaurant {
    code?: string,
    key: string,
    name: string,
    primaryType: string,
    description?: string,
    phone?: string,
    email?: string,
    address?: string,
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
    location?: Location,
    types?: Type[],
    paymentMethods?: PaymentMethod[],
    regularOpeningHours?: RegularOpeningHours[],
    photos?: Photo[],
    subscription?: Subscription,
    registrationState?: RegistrationState
}
export interface PaymentMethod {
    paymentMethod: string,
    isDefaultSelected: boolean
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