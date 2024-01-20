import {
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
  @Column(DataType.FLOAT)
  correctPercentage: number;

  @Default(false)
  @Column
  isCompleted: boolean;

  @Column(DataType.JSON)
  answers: object;

  @ForeignKey(() => Progress)
  progressId: number;

  @ForeignKey(() => Lesson)
  lessonId: number;
}
