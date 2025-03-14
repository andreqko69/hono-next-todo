import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

let envFile = '.env.development'; // Default

if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
} else if (process.env.USE_LOCAL === 'true') {
  envFile = '.env.local';
}

config({ path: envFile });

export default defineConfig({
  schema: './src/server/lib/drizzle/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.APP_USER,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DB,
    host: process.env.APP_HOST,
    port: 5432,
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
  },
});
