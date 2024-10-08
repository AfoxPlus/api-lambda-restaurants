import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'

const home: APIGatewayProxyHandler = async () => {
  const restaurantRepository = RestaurantDI.restaurantRepository
  const restaurants = await restaurantRepository.fetchHome().catch(err => {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  })
  return formatJSONSuccessResponse({
    success: true,
    payload: restaurants,
    message: "GET Restaurants"
  });
}

export const main = middyfy(home);