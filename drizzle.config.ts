import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

let envFile = '.env.local'; // Default

if (process.env.NODE_ENV === 'production') {
  config({ path: '.env.production' });
} else if (process.env.USE_LOCAL === 'true') {
  const { error } = config({ path: '.env.local' });

  if (error) {
    config({ path: '.env.development' });
  }
}

config({ path: envFile });

export default defineConfig({
  schema: './src/server/lib/drizzle/schema.ts',
  out: './src/server/lib/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.APP_USER,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DB,
    host: process.env.APP_HOST,
    port: 5432,
    ssl: false, // Enable SSL in production
  },
});
