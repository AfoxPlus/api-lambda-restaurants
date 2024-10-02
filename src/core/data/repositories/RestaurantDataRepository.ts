import { Restaurant } from "@core/domain/entities/Restaurant";
import { RestaurantRepository } from "@core/domain/repositories/RestaurantRepository";
import { RestaurantMongoDBDataSource } from "@core/data/sources/database/RestaurantMongoDBDataSource";

export class RestaurantDataRepository implements RestaurantRepository {
    constructor(private dataSource: RestaurantMongoDBDataSource) {}

    fetchHome = async(): Promise<Restaurant[]> => {
        return await this.dataSource.fetchHome()
    }
    findRestaurant = async (code: string): Promise<Restaurant> => {
        return await this.dataSource.findRestaurant(code)
    }
    add = async(restaurant: Restaurant) => {
        return await this.dataSource.add(restaurant)
    }
    findByKey = async (key: string): Promise<Restaurant> => {
        return await this.dataSource.findByKey(key)
    }

}