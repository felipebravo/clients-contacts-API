import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(userEmail: string, password: string) {
    const userFound = await this.authService.userValidation(
      userEmail,
      password,
    );

    if (!userFound) {
      throw new UnauthorizedException('invalid email or password');
    }

    return userFound;
  }
}
