import { DbUser } from '@/server/features/user/schema';

export class Transformer {
  static toDTO(user: DbUser) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
    };
  }

  static toDTOList(users: DbUser[]) {
    return users.map(this.toDTO);
  }
}
