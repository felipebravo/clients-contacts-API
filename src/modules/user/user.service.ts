import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

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

  async listUser(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    if (userId !== id) {
      throw new UnauthorizedException('access denied');
    }

    const userFound = await this.userRepository.listUser(id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return await this.userRepository.listUser(id);
  }

  async updateUser(userNewInfo: UpdateUserDto, id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    if (userId !== id) {
      throw new UnauthorizedException('access denied');
    }

    const userFound = await this.userRepository.listUser(id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return await this.userRepository.updateUser(userNewInfo, id);
  }

  async deleteUser(id: string, req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.sub;

    if (userId !== id) {
      throw new UnauthorizedException('access denied');
    }

    const userFound = await this.userRepository.listUser(id);

    if (!userFound) {
      throw new NotFoundException('user not found');
    }

    return this.userRepository.deleteUser(id);
  }

  async listAllUsers() {
    return this.userRepository.listAllUsers();
  }

  async findUserByEmail(userEmail: string) {
    const userFound = await this.userRepository.findUserByEmail(userEmail);

    return userFound;
  }
}
