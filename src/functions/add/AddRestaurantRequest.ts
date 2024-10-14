export interface AddRestaurantRequest {
    key: string,
    name: string,
    type: string,
    description?: string,
    phone?: string,
    email?: string,
    address?: string,
    urlImageLogo: string,
    ownDelivery?: Boolean,
    showInApp?: Boolean,
    paymentMethods?: PaymentMethodRequest[],
    types?: TypeRequest[],
    location?: LocationRequest,
    userRatingCount?: number,
    rating?: number,
    googleMapsUri?: string,
    websiteUri?: string,
    regularOpeningHours?: RegularOpeningHoursRequest[],
    postalCode?: string,
    areaLevel2?: string,
    areaLevel1?: string,
    country?: string,
    photos?: PhotoRequest[],
    subscription?: string,
    registrationState?: string
}

export interface PaymentMethodRequest {
    paymentMethod: string
}
export interface LocationRequest {
    latitude: number
    longitude: number
}

export interface RegularOpeningHoursRequest {
    weekdayDescription: string
}

export interface PhotoRequest {
    name: string
    widthPx: number
    heightPx: number
}

export interface TypeRequest {
    name: string
}