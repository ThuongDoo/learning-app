import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
