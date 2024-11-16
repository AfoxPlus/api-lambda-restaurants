import { Restaurant } from "@core/domain/entities/Restaurant"
import { SectionBDUI } from "@core/domain/entities/SectionBDUI"
import { RestaurantFilter } from "@core/domain/models/RestaurantFilter"
import { Autocomplete } from "../models/Autocomplete"

export interface RestaurantRepository {
    fetchHome(): Promise<Restaurant[]>
    fetchHomeBDUI(): Promise<SectionBDUI[]>
    findRestaurant(code: string): Promise<Restaurant>
    add(restaurant: Restaurant): Promise<Restaurant>
    addAll(restaurant: Restaurant[]): Promise<Restaurant[]>
    findByKey(key: string): Promise<Restaurant>
    fetchByGooglePlaces(latitude: number, longitude: number, radius: number): Promise<Restaurant[]>
    getTypes(): Promise<string[]>
    filterRestaurants(filter: RestaurantFilter): Promise<Restaurant[]>
    generateUniqueKey(): Promise<string>
    autocomplete(autocomplete: Autocomplete): Promise<Restaurant[]>
}