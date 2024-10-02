import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'

const home: APIGatewayProxyHandler = async (context) => {
  const restaurantRepository = RestaurantDI.restaurantRepository
  const { code } = context.pathParameters
  const restaurants = await restaurantRepository.findRestaurant(code).catch(err => {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  })
  return formatJSONSuccessResponse({
    success: true,
    payload: restaurants,
    message: "GET Restaurant by code"
  });
}

export const main = middyfy(home);