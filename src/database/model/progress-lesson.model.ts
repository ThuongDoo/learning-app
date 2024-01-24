import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Progress } from './progress.model';
import { Lesson } from './lesson.model';

@Table({ timestamps: true })
export class ProgressLesson extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

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
