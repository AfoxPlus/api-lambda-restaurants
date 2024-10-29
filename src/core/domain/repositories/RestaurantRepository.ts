import { Restaurant } from "@core/domain/entities/Restaurant"
import { SectionBDUI } from "@core/domain/entities/SectionBDUI"
import { RestaurantFilter } from "@core/domain/models/RestaurantFilter"

export interface RestaurantRepository {
    fetchHome(): Promise<Restaurant[]>
    fetchHomeBDUI(): Promise<SectionBDUI[]>
    findRestaurant(code: string): Promise<Restaurant>
    add(restaurant: Restaurant)
    findByKey(key: string): Promise<Restaurant>
    fetchByGooglePlaces(latitude: number, longitude: number, radius: number): Promise<Restaurant[]>
    getTypes(): Promise<string[]>
    filterRestaurants(filter: RestaurantFilter): Promise<Restaurant[]>
}