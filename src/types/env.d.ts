declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    APP_USER: string;
    APP_PASSWORD: string;
    APP_DB: string;
    APP_HOST: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
