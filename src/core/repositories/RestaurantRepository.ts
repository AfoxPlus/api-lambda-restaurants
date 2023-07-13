import { Restaurant } from "@core/entities/Restaurant";

export interface RestaurantRepository {
    fetchHome(): Promise<Restaurant[]>
    findRestaurant(code: string): Promise<Restaurant>
    add(restaurant: Restaurant)
    findByKey(key: string): Promise<Restaurant>
}