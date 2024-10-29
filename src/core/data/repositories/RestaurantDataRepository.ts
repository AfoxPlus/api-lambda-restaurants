import { Restaurant } from "@core/domain/entities/Restaurant";
import { RestaurantRepository } from "@core/domain/repositories/RestaurantRepository";
import { RestaurantMongoDBDataSource } from "@core/data/sources/database/RestaurantMongoDBDataSource";
import { GooglePlaceDataSource } from "../sources/remote/GooglePlaceDataSource";
import { Content, SectionBDUI } from "@core/domain/entities/SectionBDUI";
import { RestaurantFilter } from "@core/domain/models/RestaurantFilter";

export class RestaurantDataRepository implements RestaurantRepository {
    constructor(private dataSource: RestaurantMongoDBDataSource, private remoteDataSource: GooglePlaceDataSource) { }

    filterRestaurants = async (filter: RestaurantFilter): Promise<Restaurant[]> => {
        return await this.dataSource.filterRestaurants(filter)
    }

    getTypes = async (): Promise<string[]> => {
        return await this.dataSource.getTypes()
    }

    fetchHomeBDUI = async (): Promise<SectionBDUI[]> => {
        const restaurants = await this.dataSource.fetchHome()
        const sectionBanner: SectionBDUI = {
            sectionName: "Banner",
            sectionType: "TOP_BANNER",
            orientation_scroll: "HORIZONTAL",
            content: [{
                title: "Busca tu restaurante favorito",
                description: "Todos los restaurantes cercanos encuéntralos aquí",
                button_name: "Probar",
                button_deeplink: ""
            }]
        }
        const sectionEstablishments: SectionBDUI = {
            sectionName: "Establecimientos",
            sectionType: "ESTABLISHMENTS",
            orientation_scroll: "VERTICAL",
            content: restaurants.map((item) => this.restaurantToContent(item))
        }
        const sections: SectionBDUI[] = [sectionBanner, sectionEstablishments]
        return sections
    }

    fetchHome = async (): Promise<Restaurant[]> => {
        return await this.dataSource.fetchHome()
    }
    findRestaurant = async (code: string): Promise<Restaurant> => {
        return await this.dataSource.findRestaurant(code)
    }
    add = async (restaurant: Restaurant) => {
        return await this.dataSource.add(restaurant)
    }
    findByKey = async (key: string): Promise<Restaurant> => {
        return await this.dataSource.findByKey(key)
    }

    fetchByGooglePlaces = async (latitude: number, longitude: number, radius: number): Promise<Restaurant[]> => {
        return await this.remoteDataSource.getRestaurants(latitude, longitude, radius)
    }


    private restaurantToContent(document: Restaurant): Content {
        const restaurants: Content = {
            code: document.code,
            key: "",
            title: document.name,
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
            userRatingCount: document.userRatingCount,
            rating: document.rating,
            googleMapsUri: document.googleMapsUri,
            websiteUri: document.websiteUri,
            location: document.location,
            types: document.types.map((item) => (item.name)),
            paymentMethods: document.paymentMethods,
            subscription: document.subscription,
            registrationState: document.registrationState
        }
        return restaurants
    }
}