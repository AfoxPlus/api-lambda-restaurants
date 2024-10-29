import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'

const types: APIGatewayProxyHandler = async () => {
  const restaurantRepository = RestaurantDI.restaurantRepository
  const types = await restaurantRepository.getTypes().catch(err => {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  })
  return formatJSONSuccessResponse({
    success: true,
    payload: types,
    message: "GET Restaurant types"
  });
}

export const main = middyfy(types);