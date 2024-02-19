import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DATABASE = 'DATABASE';

const DrizzleDatabaseProvider = {
  provide: DATABASE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.getOrThrow('DATABASE_URL');
    const pool = new Pool({
      connectionString,
    });

    return drizzle(pool, { schema });
  },
};

@Global()
@Module({
  imports: [],
  exports: [DATABASE],
  providers: [DrizzleDatabaseProvider],
})
export class DrizzleModule {}
