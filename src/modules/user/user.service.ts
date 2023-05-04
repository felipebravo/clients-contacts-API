import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userToCreate: CreateUserDto) {
    const userFound = await this.userRepository.findUserByEmail(
      userToCreate.email,
    );

    if (userFound) {
      throw new ConflictException('email already exists');
    }

    return await this.userRepository.createUser(userToCreate);
  }

  async listUser(id: string) {
    const userFound = await this.userRepository.listUser(id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return await this.userRepository.listUser(id);
  }

  async updateUser(userNewInfo: UpdateUserDto, id: string) {
    const userFound = await this.userRepository.listUser(id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return await this.userRepository.updateUser(userNewInfo, id);
  }

  async deleteUser(id: string) {
    const userFound = await this.userRepository.listUser(id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return this.userRepository.deleteUser(id);
  }

  async listAllUsers() {
    return this.userRepository.listAllUsers();
  }
}
