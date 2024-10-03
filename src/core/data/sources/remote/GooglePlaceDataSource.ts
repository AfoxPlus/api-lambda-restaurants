import { Location, PaymentMethod, Photo, RegularOpeningHours, Restaurant } from "@core/domain/entities/Restaurant"
import { GlobalProperties } from "@utils/ApiProperties";
import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { AddressComponent, PaymentOptions, PhotoResponse, PlaceResponse, PlacesResponse, RegularOpeningHoursResponse } from "@core/data/sources/remote/models/response/PlaceResponse";
import { Ubigeo } from "@core/domain/entities/Ubigeo";


export class GooglePlaceDataSource{
   getRestaurants  = async (latitude: number, longitude: number, radius: number): Promise<Restaurant[]> => {
      const client = GlobalProperties.axiosInstance
      const config: AxiosRequestConfig = {
         headers: {
           'Content-Type': 'application/json',
           'X-Goog-Api-Key': GlobalProperties.googleKey,
           'X-Goog-FieldMask': 'places.addressComponents,places.regularOpeningHours.weekdayDescriptions,places.delivery,places.paymentOptions,places.websiteUri,places.primaryTypeDisplayName,places.internationalPhoneNumber,places.displayName,places.id,places.formattedAddress,places.photos,places.userRatingCount,places.rating,places.location,places.googleMapsUri',
         } as RawAxiosRequestHeaders,
       };
     
       try {
         const data = {
            "includedTypes": ["restaurant"],
            "maxResultCount": 20,
            "locationRestriction": {
              "circle": {
                "center": {
                  "latitude": latitude,
                  "longitude": longitude},
                "radius": radius
              }
            }
          };
         const response: AxiosResponse = await client.post(`/v1/places:searchNearby`, data , config);
         const placesResponse = response.data as PlacesResponse
         const result = placesResponse.places?.map(item => this.toRestaurant(item))
         return result
       } catch(err) {
         return []
       } 
     }

     private toRestaurant(place: PlaceResponse): Restaurant {
      const location: Location = {
        latitude: place.location.latitude,
        longitude: place.location.longitude
      }
      const ubigeo = this.getUbigeo(place.addressComponents)
      const restaurant: Restaurant = {
          placeId: place.id,
          key: "",
          name: place.displayName.text,
          description : "",
          phone : place.internationalPhoneNumber,
          email: "",
          address: place.formattedAddress,
          urlImageLogo: "",
          ownDelivery: place.delivery,
          showInApp: false,
          location: location,
          userRatingCount: place.userRatingCount,
          rating: place.rating,
          googleMapsUri: place.googleMapsUri,
          websiteUri:place.websiteUri,
          paymentMethods: this.getPaymentMethods(place.paymentOptions),
          regularOpeningHours: this.getRegularOpeningHours(place.regularOpeningHours),
          postalCode: ubigeo.postalCode,
          areaLevel1: ubigeo.areaLevel1,
          areaLevel2: ubigeo.areaLevel2,
          country: ubigeo.country,
          photos: this.getPhotos(place.photos),
          subscription: {id: "66fea088b59d2b8d79736253"},
          registrationState: {id: "61a19bee0b6de1476436de46"}
      }
      return restaurant
  }

  private getPaymentMethods(paymentOptions: PaymentOptions): PaymentMethod[] {
    const paymentMethod:PaymentMethod[] = []
    const cashMethod: PaymentMethod = {paymentMethod: "Efectivo"}
    paymentMethod.push(cashMethod)
    if(paymentOptions?.acceptsCreditCards) {
      const creditCardMethod: PaymentMethod = {paymentMethod: "Tarjeta de Crédito"}
      paymentMethod.push(creditCardMethod)
    }
    if(paymentOptions?.acceptsDebitCards) {
      const debitCardMethod: PaymentMethod = {paymentMethod: "Tarjeta de Débito"}
      paymentMethod.push(debitCardMethod)
    }
    return paymentMethod
  }

  private getRegularOpeningHours(response: RegularOpeningHoursResponse):RegularOpeningHours[] {
    const openingHours:RegularOpeningHours[] = []
    response?.weekdayDescriptions.forEach(item => {
      const opening: RegularOpeningHours = { weekdayDescription: item}
      openingHours.push(opening)
    })
    return openingHours
  }

  private getUbigeo(addressComponents: AddressComponent[]): Ubigeo {
    const ubigeo: Ubigeo = {}
    addressComponents?.forEach(item => {
      if(item.types.find(item => item == "postal_code")){
        ubigeo.postalCode = item.longText
      }
      else if(item.types.find(item => item == "country")){
        ubigeo.country = item.longText
      }
      else if(item.types.find(item => item == "administrative_area_level_1")){
        ubigeo.areaLevel1 = item.longText
      }
      else if(item.types.find(item => item == "administrative_area_level_2")){
        ubigeo.areaLevel2 = item.longText
      }
    });
    return ubigeo
  }

  private getPhotos(photoResponse?: PhotoResponse[]): Photo[] {
      const result = photoResponse?.map(item => this.getPhoto(item))
      return result
  }

  private getPhoto(photoResponse: PhotoResponse): Photo {
    const photo: Photo = {
      name : photoResponse.name,
      widthPx: photoResponse.widthPx,
      heightPx: photoResponse.heightPx 
    }
    return photo
  }

  

}