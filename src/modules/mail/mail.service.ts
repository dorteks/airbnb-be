import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

// type TSendMailPayload = {
//   email: string;
//   subject: string;
//   context: Object;
// };

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(code: string) {
    await this.mailerService.sendMail({
      to: 'randomemail@gmail.com',
      subject: 'Verify your email',
      context: { code },
      template: './verify_email.hbs',
    });
  }
}
