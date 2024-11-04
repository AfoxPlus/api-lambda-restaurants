
import { PartnerDataRepository } from "@core/data/repositories/PartnerDataRepository";
import { RestaurantDataRepository } from "@core/data/repositories/RestaurantDataRepository";
import { PartnerMongoDBDataSource } from "@core/data/sources/database/PartnerMongoDBDataSource";
import { RestaurantMongoDBDataSource } from "@core/data/sources/database/RestaurantMongoDBDataSource";
import { GooglePlaceDataSource } from "@core/data/sources/remote/GooglePlaceDataSource";
import { PartnerRepository } from "@core/domain/repositories/PartnerRepository";
import { RestaurantRepository } from "@core/domain/repositories/RestaurantRepository";
import { mongodbconnect } from '@utils/mongodb_connection'
class RestaurantModule {
    restaurantRepository: RestaurantRepository
    partnerRepository: PartnerRepository
    constructor() {
        mongodbconnect()
        const dataSource: RestaurantMongoDBDataSource = new RestaurantMongoDBDataSource()
        const messageDataSource: PartnerMongoDBDataSource = new PartnerMongoDBDataSource()
        const remoteDataSource: GooglePlaceDataSource = new GooglePlaceDataSource()
        this.restaurantRepository = new RestaurantDataRepository(dataSource, remoteDataSource)
        this.partnerRepository = new PartnerDataRepository(messageDataSource)
    }
}

export const RestaurantDI = new RestaurantModule()