import { defineConfig } from 'drizzle-kit';

import config from './src/config';

export default defineConfig({
  schema: './src/server/lib/drizzle/schema.ts',
  out: './src/server/lib/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    database: config.db.database,
    port: 5432,
    ssl: false, // Enable SSL in production
  },
  strict: true,
});
