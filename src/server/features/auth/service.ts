import bcrypt from 'bcrypt';

import UserService from '@/server/features/user/service';
import { AuthError } from '@/server/utils/errors';
import { AuthErrorMessage } from '@/shared/validation/auth/constants';
import { SignInData, SignUpData } from '@/shared/validation/auth/schema';

const userService = new UserService();

class AuthService {
  private readonly saltRounds = 10;

  async signUp({ email, password, firstName, lastName }: SignUpData) {
    const existingUser = await userService.findByEmail(email);

    if (existingUser) {
      throw new AuthError(AuthErrorMessage.UserWithThisEmailAlreadyExists, {
        fieldErrors: [
          {
            message: AuthErrorMessage.UserWithThisEmailAlreadyExists,
            fieldName: 'email',
          },
        ],
      });
    }

    const passwordHash = await bcrypt.hash(password, this.saltRounds);

    return userService.create({
      email,
      passwordHash,
      firstName,
      lastName,
    });
  }

  async signIn(data: SignInData) {
    const user = await userService.findByEmail(data.email);

    if (!user) {
      throw new AuthError(AuthErrorMessage.InvalidCredentials);
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      throw new AuthError(AuthErrorMessage.InvalidCredentials);
    }

    if (!user.isActive) {
      throw new AuthError(AuthErrorMessage.AccountIsInactive);
    }
  }
}

const authService = new AuthService();

export default authService;
