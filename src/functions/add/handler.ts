import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { RestaurantDI } from '@core/di/RestaurantModule'
import { EstablishmentRequest } from '@functions/add/EstablishmentRequest'
import { Restaurant } from '@core/domain/entities/Restaurant'

const addRestaurant: ValidatedEventAPIGatewayProxyEvent<EstablishmentRequest> = async (context) => {
  const restaurantRepository = RestaurantDI.restaurantRepository
  const establishment = context.body as EstablishmentRequest
  const restaurant: Restaurant = {
    key: establishment.key,
    name: establishment.name,
    primaryType: establishment.primaryType || "",
    description: establishment.description,
    phone: establishment.phone,
    email: establishment.email,
    address: establishment.address,
    urlImageLogo: establishment.urlImageLogo,
    urlImageBanner: establishment.urlImageBanner,
    ownDelivery: establishment.ownDelivery,
    isOnlyDelivery: establishment.isOnlyDelivery,
    isVerified: establishment.isVerified,
    openNow: establishment.openNow,
    showInApp: establishment.showInApp,
    userRatingCount: establishment.userRatingCount,
    rating: establishment.rating,
    googleMapsUri: establishment.googleMapsUri,
    websiteUri: establishment.websiteUri,
    postalCode: establishment.postalCode,
    areaLevel2: establishment.areaLevel2,
    areaLevel1: establishment.areaLevel1,
    country: establishment.country,
    location: establishment.location ? {
      latitude: establishment.location.coordinates[1],
      longitude: establishment.location.coordinates[0]
    } : undefined,
    types: establishment.types?.map(type => ({ name: type.name })),
    paymentMethods: establishment.paymentMethods?.map(method => ({
      paymentMethod: method.paymentMethod
    })),
    regularOpeningHours: establishment.regularOpeningHours?.map(hour => ({
      weekdayDescription: hour.weekdayDescription
    })),
    photos: establishment.photos?.map(photo => ({
      name: photo.name,
      widthPx: Number(photo.widthPx),
      heightPx: Number(photo.heightPx)
    })),
    subscription: establishment.subscription ? { id: establishment.subscription } : undefined,
    registrationState: establishment.registrationState ? { id: establishment.registrationState } : undefined
  };

  await restaurantRepository.add(restaurant)

  return formatJSONSuccessResponse({
    success: true,
    payload: {},
    message: "Added OK!"
  });
}



export const main = middyfy(addRestaurant);