import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { User } from './user.model';
import { Progress } from './progress.model';

@Table({ timestamps: true })
export class Course extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @Column
  description: string;

  @Column
  price: number;

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @BelongsToMany(() => User, () => Progress)
  users: User;
}
