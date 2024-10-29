
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'
import { RestaurantFilter } from '@core/domain/models/RestaurantFilter'

const filter: ValidatedEventAPIGatewayProxyEvent<RestaurantFilter> = async (context) => {
  try {
    const restaurantRepository = RestaurantDI.restaurantRepository
    const filter = context.body as RestaurantFilter
    const restaurants = await restaurantRepository.filterRestaurants(filter).catch(err => {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: err.toString()
      });
    })
    return formatJSONSuccessResponse({
      success: true,
      payload: restaurants,
      message: "Nearby Restaurants"
    });
  } catch (err) {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  }
}

export const main = middyfy(filter);