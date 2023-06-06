
import { APIGatewayProxyHandler } from 'aws-lambda'
import { formatJSONSuccessResponse } from '@libs/apiGateway'
import { mongodbconnect } from '@core/utils/mongodb_connection'
import { middyfy } from '@libs/lambda'
import { RestaurantRepository } from '@core/repositories/RestaurantRepository'
import { MongoDBRestaurantRepository } from '@core/repositories/database/MongoDBRestaurantRepository'


const home: APIGatewayProxyHandler = async (context) => {
  await mongodbconnect()
  const restaurantRepository: RestaurantRepository = new MongoDBRestaurantRepository()
  const { code } = context.pathParameters
  const restaurants = await restaurantRepository.findRestaurant(code)
  return formatJSONSuccessResponse({
    success: true,
    payload: restaurants,
    message: "GET Restaurant by code"
  });
}

export const main = middyfy(home);