import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
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

  @Default(0)
  @Column
  price: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @BelongsToMany(() => User, () => Progress)
  users: User;
}
