
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { middyfy } from '@libs/lambda'
import { RestaurantRepository } from '@core/repositories/RestaurantRepository'
import { MongoDBRestaurantRepository } from '@core/repositories/database/MongoDBRestaurantRepository'
import { AddRestaurantRequest } from './AddRestaurantRequest'
import { Restaurant } from '@core/entities/Restaurant'


const addRestaurant: ValidatedEventAPIGatewayProxyEvent<AddRestaurantRequest> = async (context) => {
  await mongodbconnect()
  const restaurantRepository: RestaurantRepository = new MongoDBRestaurantRepository()

  const addRestaurantRequest = context.body as AddRestaurantRequest
  const restaurant: Restaurant = {
    key: addRestaurantRequest.key,
    name: addRestaurantRequest.name,
    description: addRestaurantRequest.description,
    phone: addRestaurantRequest.phone,
    email: addRestaurantRequest.email,
    address: addRestaurantRequest.address,
    urlImageLogo: addRestaurantRequest.urlImageLogo,
    ownDelivery: addRestaurantRequest.ownDelivery,
    paymentMethods: addRestaurantRequest.paymentMethods,
    attentionSchedule: addRestaurantRequest.attentionSchedule,
    subscription: { id: addRestaurantRequest.subscription },
    registrationState: { id: addRestaurantRequest.registrationState }
  }
  await restaurantRepository.add(restaurant)
  return formatJSONSuccessResponse({
    success: true,
    payload: {},
    message: "Added OK!"
  });
}

export const main = middyfy(addRestaurant);