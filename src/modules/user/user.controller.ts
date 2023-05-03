import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUpUser(@Body() userToCreate: CreateUserDto) {
    return this.userService.createUser(userToCreate);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  listUser(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.userService.listUser(id, req);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Body() userNewInfo: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    return this.userService.updateUser(userNewInfo, id, req);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.userService.deleteUser(id, req);
  }

  @Get()
  listAllUsers() {
    return this.userService.listAllUsers();
  }
}
