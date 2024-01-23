import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Roles } from 'src/auth/decorator';
import { UserRole } from 'src/enum/role.enum';
import { CreateLessonDto } from './dto';
import { EditLessonDto } from './dto/edit-lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Get(':courseId')
  getLessonByCourseId(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.lessonService.getLessonByCourseId(courseId);
  }

  @Patch()
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  updateLesson(@Body() editLessonDto: EditLessonDto) {
    return this.lessonService.updateLesson(editLessonDto);
  }

  @Delete(':id')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  deleteLesson(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.deleteLesson(id);
  }
}
