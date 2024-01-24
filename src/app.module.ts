import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';
import {
  Course,
  Lesson,
  Progress,
  ProgressLesson,
  Question,
  User,
} from './database/model';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_LOCALHOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'test',
      models: [User, Course, Lesson, Progress, ProgressLesson, Question],
      autoLoadModels: true,
      synchronize: true,
    }),
    DatabaseModule,
    AuthModule,
    CourseModule,
    LessonModule,
    UserModule,
    QuestionModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
