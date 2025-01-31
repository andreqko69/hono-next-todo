import { eq } from 'drizzle-orm';

import { DbUserInsert, users } from '@/server/features/user/schema';
import db from '@/server/lib/drizzle';

class UserService {
  private readonly saltRounds = 10;

  create = async (userData: DbUserInsert) => {
    const userToInsert: DbUserInsert = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      passwordHash: userData.passwordHash,
    };

    const [dbUser] = await db.insert(users).values(userToInsert).returning();

    return dbUser;
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
