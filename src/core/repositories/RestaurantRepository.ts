import { Restaurant } from "@core/entities/Restaurant";

export interface RestaurantRepository {
    fetchHome(): Promise<Restaurant[]>
}