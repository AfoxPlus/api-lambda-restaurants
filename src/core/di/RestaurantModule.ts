import { RestaurantDataRepository } from "@core/data/repositories/RestaurantDataRepository";
import { RestaurantMongoDBDataSource } from "@core/data/sources/database/RestaurantMongoDBDataSource";
import { GooglePlaceDataSource } from "@core/data/sources/remote/GooglePlaceDataSource";
import { RestaurantRepository } from "@core/domain/repositories/RestaurantRepository";
import { mongodbconnect } from '@utils/mongodb_connection'
class RestaurantModule{
    restaurantRepository: RestaurantRepository
    constructor(){
        mongodbconnect()
        const dataSource: RestaurantMongoDBDataSource = new RestaurantMongoDBDataSource()
        const remoteDataSource: GooglePlaceDataSource = new GooglePlaceDataSource()
        this.restaurantRepository = new RestaurantDataRepository(dataSource,remoteDataSource)
    }
}

export const RestaurantDI = new RestaurantModule()