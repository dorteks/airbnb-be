import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          secure: true,
          host: configService.getOrThrow('MAIL_HOST'),
          port: configService.getOrThrow('MAIL_PORT'),
          auth: {
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASS'),
          },
        },
        defaults: {
          from: {
            name: configService.getOrThrow('MAIL_FROM'),
            address: configService.getOrThrow('MAIL_USER'),
          },
        },
        template: {
          // dir: join(__dirname, '..'),
          dir: configService.getOrThrow('PATH_TO_TEMPLATE'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],

  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
