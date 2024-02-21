import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JWT_SECRET } from 'src/core/constants';
import { AuthController } from './auth.controller';
import { MailService } from '../mail/mail.service';
import { PasswordService } from 'src/core/services/password';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, MailService],
})
export class AuthModule {}
