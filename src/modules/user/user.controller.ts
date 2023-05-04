import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUpUser(@Body() userToCreate: CreateUserDto) {
    return this.userService.createUser(userToCreate);
  }

  @Get(':id')
  listUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.listUser(id);
  }

  @Patch(':id')
  updateUser(
    @Body() userNewInfo: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.updateUser(userNewInfo, id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  @Get()
  listAllUsers() {
    return this.userService.listAllUsers();
  }
}
