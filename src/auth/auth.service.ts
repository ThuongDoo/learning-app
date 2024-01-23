import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/model';
import { UserRole } from 'src/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    let user = await this.userModel.findOne({ where: { email: dto.email } });
    if (user) {
      throw new ConflictException('Credentials exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);
    user = await this.userModel.create({ email: dto.email, password: hash });
    if (user.id === 1) {
      user.role = UserRole.ADMIN;
      await user.save();
    }
    return user;
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userModel.findOne({ where: { email: dto.email } });

    if (!user) {
      return null;
    }
    delete user.dataValues.password;

    return user;
  }

  async login(userData: any) {
    let user = await this.userModel.findOne({
      where: { email: userData.email },
    });
    if (!user) {
      const randomPassword = await bcrypt.genSalt(10);
      user = await this.userModel.create({
        email: userData.email,
        password: randomPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        photo: userData.photo,
      });
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAll() {
    return this.userModel.findAll({});
  }
}
