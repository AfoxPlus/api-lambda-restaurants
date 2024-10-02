
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'
import { AuthkeyRequest } from './AuthKeyRequest'

const auth: ValidatedEventAPIGatewayProxyEvent<AuthkeyRequest> = async (context) => {
  try {
    const restaurantRepository = RestaurantDI.restaurantRepository
    const { key } = context.body as AuthkeyRequest
    const restaurants = await restaurantRepository.findByKey(key).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err.toString()
      });
    })
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