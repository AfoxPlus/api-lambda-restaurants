import { PaymentMethod, Restaurant } from "@core/domain/entities/Restaurant";
import { RestaurantDocument, RestaurantModel } from "@core/data/sources/database/models/restaurant.model";
import { RegistrationStateModel, SubscriptionModel } from "@core/data/sources/database/models/registration.state.model";
import { RestaurantFilter } from "@core/domain/models/RestaurantFilter";
import crypto from 'crypto';

export class RestaurantMongoDBDataSource {

    getTypes = async (): Promise<string[]> => {
        try {
            const result = await RestaurantModel.aggregate([
                { $unwind: "$types" },
                { $group: { _id: "$types.name" } },
                { $project: { _id: 0, uniqueType: "$_id" } }
            ]);
            return result.map(item => item.uniqueType);
        } catch (error) {
            throw new Error("Error al agrupar los types");
        }
    }

    findByKey = async (key: string): Promise<Restaurant> => {
        try {
            const document = await RestaurantModel.findOne({ key: key })
            return this.documentToRestaurantAuth(document)
        } catch (err) {
            throw new Error("El identificador ingresado no existe")
        }
    }

    addFromLanding = async (restaurant: Restaurant): Promise<Restaurant> => {
        try {
            const document = {
                key: restaurant.key,
                name: restaurant.name,
                primaryType: restaurant.primaryType,
                location: {
                    type: 'Point',
                    coordinates: [
                        -8.090899,
                        -78.993774
                    ]
                },
                subscription: "66fea088b59d2b8d79736253",
                registrationState: "61a19bee0b6de1476436de46"
            }
            const result: RestaurantDocument = await RestaurantModel.create(document)
            const newRestaurant: Restaurant = {
                code: result._id.toString(),
                key: result.key,
                name: result.name,
                primaryType: result.primaryType
            }
            return newRestaurant
        } catch (err) {
            throw Error("Error al crear el establecimiento")
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

    filterRestaurants = async (filter: RestaurantFilter): Promise<Restaurant[]> => {
        try {
            const query: any = {
                showInApp: true,
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: filter.coordinates
                        },
                        $maxDistance: filter.maxDistance
                    }
                }
            }
            if (filter.types && filter.types.length > 0) {
                query["types.name"] = { $in: filter.types }
            }
            const documents = await RestaurantModel.find(query)
                .populate({ path: 'registrationState', model: RegistrationStateModel })
                .populate({ path: 'subscription', model: SubscriptionModel })
            return this.documentsToRestaurant(documents)
        } catch (error) {
            throw new Error("Error obteniendo restaurantes cercanos")
        }
    }

    generateRandomKey(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = crypto.randomInt(0, characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    generateUniqueKey = async (): Promise<string> => {
        let uniqueKey: string;
        while (true) {
            uniqueKey = this.generateRandomKey(6);
            const existingDocument = await RestaurantModel.findOne({ key: uniqueKey });
            if (!existingDocument) {
                break;
            }
        }
        return uniqueKey;
    };

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
            primaryType: document.primaryType,
            description: document.description,
            phone: document.phone,
            email: document.email,
            address: document.address,
            urlImageLogo: document.urlImageLogo,
            urlImageBanner: document.urlImageBanner,
            ownDelivery: document.ownDelivery,
            isOnlyDelivery: document.isOnlyDelivery,
            isVerified: document.isVerified,
            openNow: document.openNow,
            showInApp: document.showInApp,
            userRatingCount: document.userRatingCount,
            rating: document.rating,
            googleMapsUri: document.googleMapsUri,
            websiteUri: document.websiteUri,
            postalCode: document.postalCode,
            areaLevel2: document.areaLevel2,
            areaLevel1: document.areaLevel1,
            country: document.country,
            location: {
                longitude: document.location.coordinates[0],
                latitude: document.location.coordinates[1]
            },
            types: document.types?.map((item) => ({ name: item.name })),
            paymentMethods: this.documentToPaymentMethods(document.paymentMethods),
            regularOpeningHours: document.regularOpeningHours?.map((item) => ({ weekdayDescription: item.weekdayDescription })),
            photos: document.photos?.map((item) => ({ name: item.name, heightPx: item.heightPx, widthPx: item.widthPx })),
            subscription: {
                code: document.subscription.code,
                name: document.subscription.name
            },
            registrationState: {
                code: document.registrationState.code,
                state: document.registrationState.state
            }
        }
        return restaurants
    }

    private documentToPaymentMethods(paymentMethods: any): PaymentMethod[] {
        return paymentMethods.map(document => ({ id: document._id, paymentMethod: document.paymentMethod, isDefaultSelected: document.isDefaultSelected }))
    }

    private documentToRestaurantAuth(document: any): Restaurant {
        const restaurants: Restaurant = {
            code: document._id,
            urlImageLogo: document.urlImageLogo,
            key: document.key,
            primaryType: document.type,
            name: document.name
        }
        return restaurants
    }

    private restaurantToDocument(restaurant: Restaurant): any {
        const document = {
            key: restaurant.key,
            name: restaurant.name,
            primaryType: restaurant.primaryType,
            description: restaurant.description || "",
            phone: restaurant.phone || "",
            email: restaurant.email,
            address: restaurant.address,
            urlImageLogo: restaurant.urlImageLogo,
            urlImageBanner: restaurant.urlImageBanner,
            ownDelivery: restaurant.ownDelivery,
            isOnlyDelivery: restaurant.isOnlyDelivery,
            isVerified: restaurant.isVerified,
            openNow: restaurant.openNow,
            showInApp: restaurant.showInApp,
            userRatingCount: restaurant.userRatingCount,
            rating: restaurant.rating,
            googleMapsUri: restaurant.googleMapsUri,
            websiteUri: restaurant.websiteUri,
            postalCode: restaurant.postalCode,
            areaLevel2: restaurant.areaLevel2,
            areaLevel1: restaurant.areaLevel1,
            country: restaurant.country,
            location: {
                type: 'Point',
                coordinates: [
                    restaurant.location ? restaurant.location.longitude : 0.0,
                    restaurant.location ? restaurant.location.latitude : 0.0
                ]
            },
            types: restaurant.types.map(type => ({ name: type.name })),
            paymentMethods: restaurant.paymentMethods.map(method => ({
                paymentMethod: method.paymentMethod,
                isDefaultSelected: method.isDefaultSelected || false
            })),
            regularOpeningHours: restaurant.regularOpeningHours?.map(hour => ({
                weekdayDescription: hour.weekdayDescription
            })) || [],
            photos: restaurant.photos.map(photo => ({
                name: photo.name,
                widthPx: photo.widthPx,
                heightPx: photo.heightPx
            })),
            subscription: restaurant.subscription.id,
            registrationState: restaurant.registrationState.id
        };

        return document
    }

}