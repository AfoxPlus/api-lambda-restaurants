import { Restaurant } from "@core/entities/Restaurant";
import { RestaurantRepository } from "@core/repositories/RestaurantRepository";
import { RestaurantDocument, RestaurantModel } from "@core/repositories/database/models/restaurant.model";
import { RegistrationStateModel } from "@core/repositories/database/models/registration.state.model";

export class MongoDBRestaurantRepository implements RestaurantRepository {

    findRestaurant = async (code: string): Promise<Restaurant> => {
        try {
            const restaunratDodocument: RestaurantDocument = await RestaurantModel.findById(code).
                populate({ path: 'registrationState', model: RegistrationStateModel })
            return this.documentToRestaurant(restaunratDodocument)

        } catch (err) {
            console.log(err)
            throw new Error("Internal Error")
        }
    }

    fetchHome = async (): Promise<Restaurant[]> => {
        try {
            const restaurantDocuments: RestaurantDocument[] = await RestaurantModel.find().
                populate({ path: 'registrationState', model: RegistrationStateModel })
            return this.documentsToRestaurant(restaurantDocuments)
        } catch (err) {
            console.log(err)
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
            name: document.name,
            description: document.description,
            phone: document.phone,
            email: document.email,
            urlImageLogo: document.urlImageLogo,
            registrationState: {
                code: document.registrationState.code,
                state: document.registrationState.state
            }
        }
        return restaurants
    }

}