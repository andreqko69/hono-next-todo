import { eq } from 'drizzle-orm';

import {
  DbProfileInsert,
  DbUserInsert,
  profiles,
  users,
} from '@/server/features/user/schema';
import db from '@/server/lib/drizzle';

class UserService {
  private readonly saltRounds = 10;

  create = async ({
    userData,
    profileData,
  }: {
    userData: DbUserInsert;
    profileData: Omit<DbProfileInsert, 'userId'>;
  }) => {
    return db.transaction(async (tx) => {
      // Create the user
      const [user] = await tx
        .insert(users)
        .values({
          email: userData.email,
          passwordHash: userData.passwordHash,
        })
        .returning();

      if (!user) {
        throw new Error('Failed to create user');
      }

      // Create the profile
      const [profile] = await tx
        .insert(profiles)
        .values({
          userId: user.id,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
        })
        .returning();

      if (!profile) {
        throw new Error('Failed to create profile');
      }

      return { user, profile };
    });
  };

  findByEmail = async (email: string) => {
    return db.query.users.findFirst({ where: eq(users.email, email) });
  };

  findById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
}

const userService = new UserService();

export default userService;
