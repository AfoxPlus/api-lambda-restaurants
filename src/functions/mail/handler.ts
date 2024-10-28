
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { MailRequest } from './MailRequest'
import { RestaurantDI } from '@core/di/RestaurantModule';

const mail: ValidatedEventAPIGatewayProxyEvent<MailRequest> = async (context) => {
  try {
    const { name, email, message } = context.body as MailRequest
    const messageRepository = RestaurantDI.messageRepository
    await messageRepository.add({ name, email, message })
    return formatJSONSuccessResponse({
      success: true,
      payload: {},
      message: "Save message successfully"
    });
  } catch (err) {
    return formatJSONSuccessResponse({
      success: false,
      payload: {},
      message: err.toString()
    });
  }
}

export const main = middyfy(mail);