import { MessageDataRepository } from "@core/data/repositories/MessageDataRepository";
import { RestaurantDataRepository } from "@core/data/repositories/RestaurantDataRepository";
import { MessageMongoDBDataSource } from "@core/data/sources/database/MessageMongoDBDataSource";
import { RestaurantMongoDBDataSource } from "@core/data/sources/database/RestaurantMongoDBDataSource";
import { GooglePlaceDataSource } from "@core/data/sources/remote/GooglePlaceDataSource";
import { MessageRepository } from "@core/domain/repositories/MessageRepository";
import { RestaurantRepository } from "@core/domain/repositories/RestaurantRepository";
import { mongodbconnect } from '@utils/mongodb_connection'
class RestaurantModule {
    restaurantRepository: RestaurantRepository
    messageRepository: MessageRepository
    constructor() {
        mongodbconnect()
        const dataSource: RestaurantMongoDBDataSource = new RestaurantMongoDBDataSource()
        const messageDataSource: MessageMongoDBDataSource = new MessageMongoDBDataSource()
        const remoteDataSource: GooglePlaceDataSource = new GooglePlaceDataSource()
        this.restaurantRepository = new RestaurantDataRepository(dataSource, remoteDataSource)
        this.messageRepository = new MessageDataRepository(messageDataSource)
    }
}

export const RestaurantDI = new RestaurantModule()