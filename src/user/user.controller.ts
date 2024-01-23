import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/enum/role.enum';
import { GetUser } from 'src/auth/decorator';
import { UserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  getAll() {
    return this.userService.getAll();
  }

  @Post('/upgrade-user')
  upgradeUser(@GetUser() user, @Body() userDto: UserDto) {
    return this.userService.upgradeUser(user, userDto);
  }

  @Get('/showMe')
  showMe(@GetUser() user) {
    return this.userService.showMe(user.userId);
  }

  @Patch('/edit-user')
  updateUser(@GetUser() user, @Body() editUserDto: EditUserDto) {
    return this.userService.editUser(user, editUserDto);
  }
}
