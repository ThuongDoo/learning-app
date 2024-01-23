import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from './course.model';
import { Question } from './question.model';
import { Progress } from './progress.model';
import { ProgressLesson } from './progress-lesson.model';

@Table({ timestamps: true })
export class Lesson extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @Column
  description: string;

  @Column
  duration: number; //second

  @Column
  video: string;

  @AllowNull(false)
  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Question)
  questions: Question[];

  @BelongsToMany(() => Progress, () => ProgressLesson)
  progresses: Progress[];
}
