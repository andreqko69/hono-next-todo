import { drizzle } from '../node_modules/drizzle-orm/node-postgres/index.js';
import { migrate } from '../node_modules/drizzle-orm/node-postgres/migrator.js';
import Pg from '../node_modules/pg/lib/index.js';

const pool = new Pg.Pool({
  user: process.env.APP_USER,
  password: process.env.APP_PASSWORD,
  database: process.env.APP_DB,
  host: process.env.APP_HOST,
  port: 5432,
});

const db = drizzle(pool);

const migrateDb = async () => {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './migrations' });
  console.log('Migrations completed!');
  process.exit(0);
};

migrateDb().catch((err) => {
  console.error('Migration failed!', err);
  process.exit(1);
});
