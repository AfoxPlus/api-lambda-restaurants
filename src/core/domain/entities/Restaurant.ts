import { RegistrationState } from "@core/domain/entities/RegistrationState";
import { Subscription } from "@core/domain/entities/Subscription";

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
    showInApp?: Boolean,
    paymentMethods?: [{ paymentMethod: string }],
    attentionSchedule?: string,
    subscription?: Subscription,
    registrationState?: RegistrationState
}