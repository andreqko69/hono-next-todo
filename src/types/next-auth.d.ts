import { DefaultJWT } from '@auth/core/jwt';
import { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      // Add other custom properties here
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    // Add other custom properties here
  }
}
