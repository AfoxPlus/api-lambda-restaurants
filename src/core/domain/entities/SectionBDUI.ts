import { RegistrationState } from "@core/domain/entities/RegistrationState"
import { Location, PaymentMethod } from "@core/domain/entities/Restaurant"
import { Subscription } from "@core/domain/entities/Subscription"

export interface SectionBDUI {
    sectionName: string
    sectionType: string
    orientation_scroll: string
    content: Content[]
}

export interface Content {
    title: string
    description: string
    button_name?: string
    button_deeplink?: string
    code?: string
    key?: string
    primaryType?: string
    types?: string[]
    phone?: string
    email?: string
    address?: string
    location?: Location
    subscription?: Subscription
    paymentMethods?: PaymentMethod[]
    urlImageLogo?: string
    urlImageBanner?: string
    ownDelivery?: boolean
    isOnlyDelivery?: boolean
    isVerified?: boolean
    openNow?: boolean
    rating?: number
    userRatingCount?: number
    googleMapsUri?: string
    websiteUri?: string
    registrationState?: RegistrationState
}