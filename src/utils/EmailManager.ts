import { Restaurant } from "@core/domain/entities/Restaurant";
import nodemailer from 'nodemailer';
import { GlobalProperties } from '@utils/ApiProperties';

class EmailManagerRepository {

  async sendEmailAfterRegister(to: string, name: string, restaurantData: Restaurant): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GlobalProperties.googleGmailAccount,
        pass: GlobalProperties.googleGamilPass,
      },
    });


    const emailContent = `
  <h1>¡Bienvenido a <strong>YaListo</strong>!</h1>
  <p>Hola ${name},</p>
  <p>¡Nos complace darte la bienvenida a <strong>YaListo</strong>! Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
  
  <h3>Detalles de tu registro:</h3>
  <ul>
    <li><strong>Identificador del Establecimiento:</strong> ${restaurantData.key}</li>
    <li><strong>Nombre del Establecimiento:</strong> ${restaurantData.name}</li>
    <li><strong>Tipo de Establecimiento:</strong> ${restaurantData.primaryType}</li>
  </ul>

  <p>Para comenzar a aprovechar todas las funcionalidades de nuestra plataforma, te recomendamos que descargues nuestra aplicación móvil <strong>YaListo</strong>. Puedes hacerlo a través del siguiente enlace:</p>
  <p><a href="https://play.google.com/store/apps/details?id=com.afoxplus.yalisto&pcampaignid=web_share">Descargar <strong>YaListo</strong> en Google Play</a></p>

  <p>Además, te invitamos a ingresar a nuestra página web para registrar tus productos y gestionar tu establecimiento:</p>
  <p><a href="https://afoxplus.github.io/yalisto-admin">Acceder a <strong>YaListo</strong></a></p>

  <p>Para gestionar tus pedidos, también puedes descargar la aplicación administrativa desde el siguiente enlace:</p>
  <p><a href="https://appdistribution.firebase.dev/i/3a3908af283dff0d">Descargar Aplicación Administrativa</a></p>

  <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>

  <p>¡Una vez más, bienvenido a <strong>YaListo</strong>!</p>

  <p>Saludos cordiales,<br>El equipo de <strong>YaListo</strong></p>
`;

    const mailOptions = {
      from: GlobalProperties.googleGmailAccount,
      to,
      subject: "¡Bienvenido a YaListo!",
      html: emailContent
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

}

export const EmailManager = new EmailManagerRepository()