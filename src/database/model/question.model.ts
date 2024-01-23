import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';

@Table({ timestamps: true })
export class Question extends Model {
  @AllowNull(false)
  @Column
  questionText: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  options: string[];

  @AllowNull(false)
  @Column(DataType.JSON)
  correctAnswers: number[];

  @AllowNull(false)
  @ForeignKey(() => Lesson)
  @Column
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;
}
