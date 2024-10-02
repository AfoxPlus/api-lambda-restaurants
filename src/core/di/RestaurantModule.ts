import { RestaurantDataRepository } from "@core/data/repositories/RestaurantDataRepository";
import { RestaurantMongoDBDataSource } from "@core/data/sources/database/RestaurantMongoDBDataSource";
import { RestaurantRepository } from "@core/domain/repositories/RestaurantRepository";
import { mongodbconnect } from '@utils/mongodb_connection'

class RestaurantModule{
    restaurantRepository: RestaurantRepository

    constructor(){
        mongodbconnect()
        const dataSource: RestaurantMongoDBDataSource = new RestaurantMongoDBDataSource()
        this.restaurantRepository = new RestaurantDataRepository(dataSource)
    }

}

export const RestaurantDI = new RestaurantModule()