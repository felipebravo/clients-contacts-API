import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userToCreate: CreateUserDto): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        fullName: userToCreate.fullName,
        email: userToCreate.email,
        phone: userToCreate.phone,
        password: userToCreate.password,
      },
    });

    return plainToInstance(User, createdUser);
  }

  async listUser(id: string): Promise<User> {
    const userFound = await this.prisma.user.findUnique({ where: { id } });

    return plainToInstance(User, userFound);
  }

  async updateUser(userNewInfo: UpdateUserDto, id: string): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        fullName: userNewInfo.fullName ?? undefined,
        email: userNewInfo.email ?? undefined,
        phone: userNewInfo.phone ?? undefined,
        password: userNewInfo.password ?? undefined,
      },
    });

    return plainToInstance(User, updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async listAllUsers(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany();

    return plainToInstance(User, allUsers);
  }

  async findUserByEmail(userEmail: string): Promise<User> {
    const userFound = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    return userFound;
  }
}
