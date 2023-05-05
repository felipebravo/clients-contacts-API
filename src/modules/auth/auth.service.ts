import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { plainToInstance } from 'class-transformer';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async userValidation(userEmail: string, userPassword: string) {
    const userFound = await this.userService.findUserByEmail(userEmail);

    if (userFound) {
      const passwordMatch = await compare(userPassword, userFound.password);

      if (passwordMatch) {
        return { email: userFound.email };
      }
    }

    return null;
  }

  async login(userEmail: string) {
    const userFound = await this.userService.findUserByEmail(userEmail);

    const user = plainToInstance(User, userFound);

    return {
      token: this.jwtService.sign({ userEmail }, { subject: userFound.id }),
      user: user,
    };
  }
}
