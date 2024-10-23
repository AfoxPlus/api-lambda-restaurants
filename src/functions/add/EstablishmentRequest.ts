interface LocationRequest {
    type: 'Point';
    coordinates: [number, number];
}

interface TypeRequest {
    name: string;
}

interface PaymentMethodRequest {
    paymentMethod: string;
    isDefaultSelected?: boolean;
}

interface RegularOpeningHourRequest {
    weekdayDescription: string;
}

interface PhotoRequest {
    name: string;
    widthPx: string;
    heightPx: string;
}

export interface EstablishmentRequest {
    key: string;
    name: string;
    primaryType?: string;
    description?: string;
    phone?: string;
    email?: string;
    address?: string;
    urlImageLogo?: string;
    urlImageBanner?: string;
    ownDelivery?: boolean;
    isOnlyDelivery?: boolean;
    isVerified?: boolean;
    openNow?: boolean;
    showInApp?: boolean;
    userRatingCount?: number;
    rating?: number;
    googleMapsUri?: string;
    websiteUri?: string;
    postalCode?: string;
    areaLevel2?: string;
    areaLevel1?: string;
    country?: string;
    location: LocationRequest;
    types?: TypeRequest[];
    paymentMethods?: PaymentMethodRequest[];
    regularOpeningHours?: RegularOpeningHourRequest[];
    photos?: PhotoRequest[];
    subscription?: string;
    registrationState?: string;
}
