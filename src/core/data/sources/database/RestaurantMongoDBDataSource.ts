import { Restaurant } from "@core/domain/entities/Restaurant";
import { RestaurantDocument, RestaurantModel } from "@core/data/sources/database/models/restaurant.model";
import { RegistrationStateModel, SubscriptionModel } from "@core/data/sources/database/models/registration.state.model";

export class RestaurantMongoDBDataSource {

    findByKey = async (key: string): Promise<Restaurant> => {
        try {
            const document = await RestaurantModel.findOne({ key: key })
            return this.documentToRestaurantAuth(document)
        } catch (err) {
            throw new Error("El identificador ingresado no existe")
        }
    }

    add = async (restaurant: Restaurant) => {
        const document = this.restaurantToDocument(restaurant)
        await RestaurantModel.create(document)
    }

    findRestaurant = async (code: string): Promise<Restaurant> => {
        try {
            const restaunratDodocument: RestaurantDocument = await RestaurantModel.findById(code)
                .populate({ path: 'registrationState', model: RegistrationStateModel })
                .populate({ path: 'subscription', model: SubscriptionModel })
            return this.documentToRestaurant(restaunratDodocument)

        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    fetchHome = async (): Promise<Restaurant[]> => {
        try {
            const restaurantDocuments: RestaurantDocument[] = await RestaurantModel.find({ showInApp: true })
                .populate({ path: 'registrationState', model: RegistrationStateModel })
                .populate({ path: 'subscription', model: SubscriptionModel })
            return this.documentsToRestaurant(restaurantDocuments)
        } catch (err) {
            throw new Error("Internal Error")
        }
    }

    private documentsToRestaurant(documents: RestaurantDocument[]): Restaurant[] {
        const restaurants: Restaurant[] = documents.map((document) => (
            this.documentToRestaurant(document)
        ))
        return restaurants
    }

    private documentToRestaurant(document: RestaurantDocument): Restaurant {
        const restaurants: Restaurant = {
            code: document._id.toString(),
            key: "",
            name: document.name,
            description: document.description,
            phone: document.phone,
            email: document.email,
            address: document.address,
            attentionSchedule: document.attentionSchedule,
            subscription: {
                code: document.subscription.code,
                name: document.subscription.name
            },
            paymentMethods: this.documentToPaymentMethods(document.paymentMethods),
            urlImageLogo: document.urlImageLogo,
            ownDelivery: document.ownDelivery,
            registrationState: {
                code: document.registrationState.code,
                state: document.registrationState.state
            }
        }
        return restaurants
    }

    private documentToPaymentMethods(paymentMethods: any): any {
        return paymentMethods.map(document => ({ id: document._id, paymentMethod: document.paymentMethod, isDefaultSelected: document.isDefaultSelected }))
    }

    private documentToRestaurantAuth(document: any): Restaurant {
        const restaurants: Restaurant = {
            code: document._id,
            urlImageLogo: document.urlImageLogo,
            key: document.key,
            name: document.name
        }
        return restaurants
    }

    private restaurantToDocument(restaurant: Restaurant): any {
        const document = {
            name: restaurant.name,
            key: restaurant.key,
            description: restaurant.description,
            address: restaurant.address,
            attentionSchedule: restaurant.attentionSchedule,
            phone: restaurant.phone,
            email: restaurant.email,
            urlImageLogo: restaurant.urlImageLogo,
            ownDelivery: restaurant.ownDelivery,
            paymentMethods: restaurant.paymentMethods,
            subscription: restaurant.subscription.id.toString(),
            registrationState: restaurant.registrationState.id.toString()
        }
        return document
    }

}