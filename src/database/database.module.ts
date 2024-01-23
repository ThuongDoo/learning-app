import { Module } from '@nestjs/common';
import {
  Course,
  Lesson,
  Progress,
  ProgressLesson,
  Question,
  User,
} from './model';
import { SequelizeModule } from '@nestjs/sequelize';

const models = [User, Course, Lesson, Question, Progress, ProgressLesson];

@Module({
  imports: [SequelizeModule.forFeature(models)],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
