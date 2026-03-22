import { User } from './user.entity';

export interface IUserRepository {
  create(
    firstName: string,
    lastName: string,
    document: string,
    email: string,
    hashedPassword: string,
  ): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
