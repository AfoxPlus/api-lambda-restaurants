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
    type: addRestaurantRequest.type,
    description: addRestaurantRequest.description,
    phone: addRestaurantRequest.phone,
    email: addRestaurantRequest.email,
    address: addRestaurantRequest.address,
    urlImageLogo: addRestaurantRequest.urlImageLogo,
    ownDelivery: addRestaurantRequest.ownDelivery,
    paymentMethods: addRestaurantRequest.paymentMethods,
    subscription: { id: addRestaurantRequest.subscription },
    registrationState: { id: addRestaurantRequest.registrationState },
    types: addRestaurantRequest.types?.map((item) => ({ name: item.name })),
    location: { latitude: addRestaurantRequest.location.latitude, longitude: addRestaurantRequest.location.longitude },
    userRatingCount: addRestaurantRequest.userRatingCount,
    rating: addRestaurantRequest.rating,
    googleMapsUri: addRestaurantRequest.googleMapsUri,
    websiteUri: addRestaurantRequest.websiteUri,
    regularOpeningHours: addRestaurantRequest.regularOpeningHours?.map((item) => ({ weekdayDescription: item.weekdayDescription })),
    postalCode: addRestaurantRequest.postalCode,
    areaLevel2: addRestaurantRequest.areaLevel2,
    areaLevel1: addRestaurantRequest.areaLevel1,
    country: addRestaurantRequest.country,
    photos: addRestaurantRequest.photos?.map((item) => ({ name: item.name, widthPx: item.widthPx, heightPx: item.heightPx }))
  }
  await restaurantRepository.add(restaurant)
  return formatJSONSuccessResponse({
    success: true,
    payload: {},
    message: "Added OK!"
  });
}

export const main = middyfy(addRestaurant);