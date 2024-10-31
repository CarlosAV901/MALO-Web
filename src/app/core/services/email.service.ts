// email.service.ts
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  isLoading = false;

  constructor(){emailjs.init('hu9NUc46MCjfsXycg')}

  sendEmail(toName: string, message: string, userEmail: string): Promise<void> {
    const emailParams = {
      to_name: toName,
      message: message,
      user_email: userEmail,
    };
    
    return emailjs
      .send('service_mcr52vh', 'template_fg2ehi9', emailParams)
      .then((response) => {
        console.log('El correo se ha enviado correctamente!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Error al envier el correo', error);
      });
  }

  // Función para generar el código aleatorio
  generateRandomCode(length: number = 6): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
