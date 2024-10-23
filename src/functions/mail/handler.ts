
import { ValidatedEventAPIGatewayProxyEvent, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { MailRequest } from './MailRequest'
import nodemailer, { Transporter } from "nodemailer";
import { GlobalProperties } from '@utils/ApiProperties';


const mail: ValidatedEventAPIGatewayProxyEvent<MailRequest> = async (context) => {
  try {
    const googleGamilPass = GlobalProperties.googleGamilPass
    const { name, email, message } = context.body as MailRequest

    const transporter: Transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "afoxplus@gmail.com",
        pass: googleGamilPass,
      },
    });

    const mailOptions = {
      from: "afoxplus@gmail.com",
      to: 'jmendozat13@gmail.com',
      subject: 'Contacto - ' + name + ' - ' + email,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
    return formatJSONSuccessResponse({
      success: true,
      payload: {},
      message: "Send message successfully"
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