import {
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
  @Column
  order: number;

  @Column
  questionText: string;

  @Column(DataType.ARRAY(DataType.STRING))
  options: string[];

  @Column(DataType.ARRAY(DataType.NUMBER))
  correctAnswers: number[];

  @ForeignKey(() => Lesson)
  lessonId: Lesson;

  @BelongsTo(() => Lesson)
  lesson: Lesson;
}
