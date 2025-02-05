import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const pool = new Pool({
  user: process.env.APP_USER,
  password: process.env.APP_PASSWORD,
  database: process.env.APP_DB,
  host: process.env.APP_HOST,
  port: 5432,
  ssl: false,
});

const db = drizzle(pool, { schema });

export default db;
