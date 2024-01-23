import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Course } from './course.model';
import { Lesson } from './lesson.model';
import { ProgressLesson } from './progress-lesson.model';

@Table({ timestamps: true })
export class Progress extends Model {
  @Default(0)
  @Column(DataType.FLOAT)
  completePercentage: number;

  @Default(0)
  @Column(DataType.FLOAT)
  correctPercentage: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull(false)
  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsToMany(() => Lesson, () => ProgressLesson)
  lessons: Lesson[];
}
