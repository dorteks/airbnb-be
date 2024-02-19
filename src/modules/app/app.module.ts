import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { DrizzleModule } from '../drizzle/drizzle.module';
@Module({
  imports: [
    RoomsModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
