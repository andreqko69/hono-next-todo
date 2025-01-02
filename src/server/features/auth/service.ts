import bcrypt from 'bcrypt';

import UserService from '@/server/features/user/service';
import { AuthError, ValidationError } from '@/server/utils/errors';
import { SignInData, SignUpData } from '@/shared/validation/auth/schema';

const userService = new UserService();

class AuthService {
  private readonly saltRounds = 10;

  async signUp(data: SignUpData) {
    const existingUser = await userService.findByEmail(data.email);

    if (existingUser) {
      throw new AuthError('User with this email already exists', {
        fieldName: 'email',
      });
    }

    if (!data.terms) {
      throw new ValidationError('You must accept the terms and conditions', {
        fieldName: 'terms',
      });
    }

    const passwordHash = await bcrypt.hash(data.password, this.saltRounds);

    return userService.create({
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  async signIn(data: SignInData) {
    const user = await userService.findByEmail(data.email);

    if (!user) {
      throw new AuthError('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      throw new AuthError('Invalid credentials');
    }

    if (!user.isActive) {
      throw new AuthError('Account is inactive');
    }
  }
}

const authService = new AuthService();

export default authService;
