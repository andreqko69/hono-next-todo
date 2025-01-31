import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      // Add other custom properties here
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    // Add other custom properties here
  }
}
