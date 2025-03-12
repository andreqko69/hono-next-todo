import { compare } from 'bcryptjs';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

import userService from '@/server/features/user/service';
import { ExtraExceptionData } from '@/server/utils/errors';
import { Route } from '@/shared/navigation/constants';
import { AuthErrorMessage } from '@/shared/validation/auth/constants';
import { signInSchema } from '@/shared/validation/auth/schema';

const MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const UPDATE_AGE = 60 * 60; // 1 hour

class CustomNextAuthError extends CredentialsSignin {
  constructor(message: string, extraExceptionData?: ExtraExceptionData) {
    super(message);
    this.code = JSON.stringify({ message, ...extraExceptionData });
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await userService.findByEmail(email);

          if (!user) {
            throw new CustomNextAuthError(
              AuthErrorMessage.UserWithThisEmailDoesNotExist,
              {
                fieldErrors: [
                  {
                    fieldName: 'email',
                    message: AuthErrorMessage.UserWithThisEmailDoesNotExist,
                  },
                ],
              }
            );
          }

          const isValidPassword = await compare(password, user.passwordHash);

          if (!isValidPassword) {
            throw new CustomNextAuthError(AuthErrorMessage.InvalidCredentials);
          }

          if (user.deletedAt) {
            throw new CustomNextAuthError(AuthErrorMessage.UserIsDeleted);
          }

          return {
            id: user.id,
            email: user.email,
          };
        } catch (error: unknown) {
          if (error instanceof ZodError) {
            throw new CustomNextAuthError(AuthErrorMessage.InvalidCredentials, {
              fieldErrors: error.errors.map((err) => ({
                fieldName: err.path.join('.'),
                message: err.message,
              })),
            });
          }

          if (error instanceof CustomNextAuthError) {
            throw error;
          }

          throw new CustomNextAuthError(
            AuthErrorMessage.SomethingWentWrongDuringSignIn
          );
        }
      },
    }),
  ],
  pages: {
    signIn: Route.SignIn,
  },
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
    updateAge: UPDATE_AGE,
  },
  jwt: {
    maxAge: MAX_AGE,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id && user?.email) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id && token.email) {
        session.user.id = token.id;
        session.user.email = token.email;
      }

      return session;
    },
  },
  trustHost: true,
});
