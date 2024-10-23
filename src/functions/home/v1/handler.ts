import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'

const homeBDUI: APIGatewayProxyHandler = async () => {
  const restaurantRepository = RestaurantDI.restaurantRepository
  const restaurants = await restaurantRepository.fetchHomeBDUI().catch(err => {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  })
  return formatJSONSuccessResponse({
    success: true,
    payload: restaurants,
    message: "GET Home BDUI"
  });
}

export const main = middyfy(homeBDUI);