
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { middyfy } from '@libs/lambda'
import { RestaurantRepository } from '@core/repositories/RestaurantRepository'
import { MongoDBRestaurantRepository } from '@core/repositories/database/MongoDBRestaurantRepository'
import { AuthkeyRequest } from './AuthKeyRequest'


const auth: ValidatedEventAPIGatewayProxyEvent<AuthkeyRequest> = async (context) => {
  try {
    await mongodbconnect()
    const restaurantRepository: RestaurantRepository = new MongoDBRestaurantRepository()
    const { key } = context.body as AuthkeyRequest
    const restaurants = await restaurantRepository.findByKey(key)
    return formatJSONSuccessResponse({
      success: true,
      payload: restaurants,
      message: "GET Restaurant by key"
    });
  } catch (err) {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  }
}

export const main = middyfy(auth);