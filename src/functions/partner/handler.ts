
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { PartnerRequest } from './PartnerRequest'
import { RestaurantDI } from '@core/di/RestaurantModule';
import { Restaurant } from '@core/domain/entities/Restaurant';
import { EmailManager } from '@utils/EmailManager';

const partner: ValidatedEventAPIGatewayProxyEvent<PartnerRequest> = async (context) => {
  try {
    const { name, email, phone, establishmentName, establishmentType } = context.body as PartnerRequest

    const partnerRepository = RestaurantDI.partnerRepository
    const restaurantRepository = RestaurantDI.restaurantRepository
    const partner = await partnerRepository.findByEmail(email)

    if (partner == null) {
      const newKey = await restaurantRepository.generateUniqueKey()
      const restaurant: Restaurant = {
        key: newKey,
        name: establishmentName,
        primaryType: establishmentType
      }
      const establishmentResult = await restaurantRepository.add(restaurant);

      const partnerData = {
        name,
        email,
        phone,
        restaurants: [establishmentResult]
      };

      await Promise.all([partnerRepository.add(partnerData), EmailManager.sendEmailAfterRegister(email, name, restaurant)]);

      return formatJSONSuccessResponse({
        success: true,
        payload: {},
        message: "¡Bienvenido/a! Te has registrado exitosamente. Revisa tu correo electrónico para encontrar tus credenciales y comenzar a explorar todas nuestras funciones."
      });

    } else {
      return formatJSONSuccessResponse({
        success: false,
        payload: {},
        message: "El email ingresado ya está en uso. Por favor, prueba con otro email."
      });
    }

  } catch (err) {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: "Hubo un problema en nuestros servidores. Por favor, inténtalo de nuevo más tarde o contáctanos para más ayuda"
    });
  }
}

export const main = middyfy(partner);