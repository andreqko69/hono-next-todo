import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';
import config from '@/config';

const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  database: config.db.database,
  port: 5432,
  ssl: false,
});

const db = drizzle(pool, { schema });

export default db;
