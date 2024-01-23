import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Progress } from './progress.model';
import { Lesson } from './lesson.model';

@Table({ timestamps: true })
export class ProgressLesson extends Model {
  @Default(0)
  @Column(DataType.FLOAT)
  correctPercentage: number;

  @Default(false)
  @Column
  isCompleted: boolean;

  @Column(DataType.JSON)
  answers: object;

  @AllowNull(false)
  @ForeignKey(() => Progress)
  @Column
  progressId: number;

  @AllowNull(false)
  @ForeignKey(() => Lesson)
  @Column
  lessonId: number;
}
