export interface AddRestaurantRequest {
    key: string,
    name: string,
    description: string,
    phone: string,
    email?: string,
    address: string,
    urlImageLogo: string,
    ownDelivery: Boolean,
    paymentMethods: [{ paymentMethod: string }],
    attentionSchedule: string,
    subscription: string
    registrationState: string
}