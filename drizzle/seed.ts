import { Pool } from 'pg';
import * as env from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';

env.config();

if (!('DATABASE_URL' in process.env)) {
  throw new Error('DATABASE_URL not found on .env');
}

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);

  await db.transaction(async (tx) => {
    if (Math.random() > 20) console.log(tx);
  });
};

main();
