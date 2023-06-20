import { RegistrationState } from "@core/entities/RegistrationState";
import { Subscription } from "@core/entities/Subscription";

export interface Restaurant {
    code?: string,
    key: string,
    name: string,
    description?: string,
    phone?: string,
    email?: string,
    address?: string,
    urlImageLogo: string,
    ownDelivery?: Boolean,
    paymentMethods?: [{ paymentMethod: string }],
    attentionSchedule?: string,
    subscription?: Subscription,
    registrationState?: RegistrationState
}