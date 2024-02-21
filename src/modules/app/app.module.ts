import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { RoomsModule } from '../rooms/rooms.module';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    RoomsModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
