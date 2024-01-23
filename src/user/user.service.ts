import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/model';
import { UserRole } from 'src/enum/role.enum';
import { UserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async upgradeUser(myInfo, userDto: UserDto) {
    if (myInfo.role === UserRole.ADMIN) {
      return this.userModel.update(
        { role: userDto.role },
        { where: { id: userDto.id } },
      );
    } else {
      return this.userModel.update(
        { role: UserRole.TEACHER },
        { where: { id: myInfo.userId } },
      );
    }
  }

  async getAll(): Promise<User[]> {
    return this.userModel.findAll({});
  }

  async editUser(myInfo, editUserDto: EditUserDto) {
    if (myInfo.role !== UserRole.ADMIN && myInfo.userId !== editUserDto.id) {
      throw new ForbiddenException(
        'you do not have permisson to change other information',
      );
    }
    return this.userModel.update(
      {
        firstName: editUserDto.firstName,
        lastName: editUserDto.lastName,
        photo: editUserDto.photo,
      },
      { where: { id: editUserDto.id } },
    );
  }

  async showMe(id: string): Promise<User> {
    const user = this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('user is not exist');
    }
    return user;
  }
}
