
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'
import { Autocomplete } from '@core/domain/models/Autocomplete'

const autocomplete: ValidatedEventAPIGatewayProxyEvent<Autocomplete> = async (context) => {
  try {
    const restaurantRepository = RestaurantDI.restaurantRepository
    const autocomplete = context.body as Autocomplete
    const restaurants = await restaurantRepository.autocomplete(autocomplete).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err.toString()
      });
    })
    return formatJSONSuccessResponse({
      success: true,
      payload: restaurants,
      message: "Autocomplete Restaurants"
    });
  } catch (err) {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  }
}

export const main = middyfy(autocomplete);