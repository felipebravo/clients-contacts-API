import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract createUser(userToCreate: CreateUserDto): Promise<User> | User;
  abstract listUser(id: string): Promise<User | undefined> | User;
  abstract updateUser(
    userNewInfo: UpdateUserDto,
    id: string,
  ): Promise<User> | User;
  abstract deleteUser(id: string): Promise<void> | void;
  abstract listAllUsers(): Promise<User[]> | User[];
  abstract findUserByEmail(userEmail: string): Promise<User | undefined> | User;
}
