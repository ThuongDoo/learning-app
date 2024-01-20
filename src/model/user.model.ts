import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserRole } from 'src/enum/role.enum';
import { Course } from './course.model';
import { Progress } from './progress.model';

@Table({ timestamps: true })
export class User extends Model {
  @IsEmail
  @Unique
  @Column
  email: string;

  @Default('123456')
  @Column
  password: string;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @Default(
    'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
  )
  @Column
  photo: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserRole),
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  @BelongsToMany(() => Course, () => Progress)
  courses: Course[];
}
