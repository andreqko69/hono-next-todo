import { hash } from 'bcryptjs';

import userService from '@/server/features/user/service';
import { AuthError } from '@/server/utils/errors';
import { AuthErrorMessage } from '@/shared/validation/auth/constants';
import { SignUpData } from '@/shared/validation/auth/schema';

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

    const passwordHash = await hash(password, this.saltRounds);

    return userService.create({
      email,
      passwordHash,
      firstName,
      lastName,
    });
  }
}

const authService = new AuthService();

export default authService;
