declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_NAME: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
