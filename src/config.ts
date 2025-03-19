import { config as dotenvConfig } from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenvConfig({ path: '.env.production' });
} else {
  // prioritize local environment variables
  const { error } = dotenvConfig({ path: '.env.local' });

  if (error) {
    dotenvConfig({ path: '.env.development' });
  }
}

const config = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  },
  nextAuth: {
    url: process.env.NEXTAUTH_URL,
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default config;
