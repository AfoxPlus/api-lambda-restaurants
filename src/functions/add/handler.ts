import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'
import { AddRestaurantRequest } from '@functions/add/AddRestaurantRequest'
import { Restaurant } from '@core/domain/entities/Restaurant'

const addRestaurant: ValidatedEventAPIGatewayProxyEvent<AddRestaurantRequest> = async (context) => {

  const restaurantRepository = RestaurantDI.restaurantRepository

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