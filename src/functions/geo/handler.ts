import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'
import { LocationRequest } from '@functions/geo/LocationRequest'

const addRestaurants: ValidatedEventAPIGatewayProxyEvent<LocationRequest> = async (context) => {

  const restaurantRepository = RestaurantDI.restaurantRepository
  const locationRequest = context.body as LocationRequest

  const result = await restaurantRepository.fetchByGooglePlaces(locationRequest.latitude, locationRequest.longitude, locationRequest.radius)

  return formatJSONSuccessResponse({
    success: true,
    payload: result,
    message: "Get restaurants by google places OK!"
  });
}

export const main = middyfy(addRestaurants);