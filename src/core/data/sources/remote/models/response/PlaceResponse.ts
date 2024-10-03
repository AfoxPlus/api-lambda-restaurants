export interface PlacesResponse {
    places?: PlaceResponse[]
  }

  export interface PlaceResponse {
    id: string
    internationalPhoneNumber: string
    formattedAddress: string
    addressComponents: AddressComponent[]
    location: LocationResponse
    rating: number
    googleMapsUri: string
    websiteUri: string
    regularOpeningHours: RegularOpeningHoursResponse
    userRatingCount: number
    displayName: DisplayName
    primaryTypeDisplayName: PrimaryTypeDisplayName
    delivery: boolean
    photos?: PhotoResponse[]
    paymentOptions: PaymentOptions
  }
  
  export interface AddressComponent {
    longText: string
    shortText: string
    types: string[]
    languageCode: string
  }
  
  export interface LocationResponse {
    latitude: number
    longitude: number
  }
  
  export interface RegularOpeningHoursResponse {
    weekdayDescriptions: string[]
  }
  
  export interface DisplayName {
    text: string
    languageCode: string
  }
  
  export interface PrimaryTypeDisplayName {
    text: string
    languageCode: string
  }
  
  export interface PhotoResponse {
    name: string
    widthPx: number
    heightPx: number
    authorAttributions: AuthorAttribution[]
  }
  
  export interface AuthorAttribution {
    displayName: string
    uri: string
    photoUri: string
  }
  
  export interface PaymentOptions {
    acceptsCreditCards: boolean
    acceptsDebitCards: boolean
    acceptsCashOnly: boolean
    acceptsNfc: boolean
  }
  
  