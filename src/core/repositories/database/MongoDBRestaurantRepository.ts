import { Restaurant } from "@core/entities/Restaurant";
import { RestaurantRepository } from "@core/repositories/RestaurantRepository";
import { RestaurantDocument, RestaurantModel } from "@core/repositories/database/models/restaurant.model";
import { RegistrationStateModel, SubscriptionModel } from "@core/repositories/database/models/registration.state.model";

export class MongoDBRestaurantRepository implements RestaurantRepository {
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
            const restaurantDocuments: RestaurantDocument[] = await RestaurantModel.find()
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
            paymentMethods: document.paymentMethods,
            urlImageLogo: document.urlImageLogo,
            ownDelivery: document.ownDelivery,
            registrationState: {
                code: document.registrationState.code,
                state: document.registrationState.state
            }
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