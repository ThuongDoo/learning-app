import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { GetUser } from 'src/auth/decorator';
import { AnswerDto } from './dto';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post(':courseId')
  enrollCourse(
    @GetUser() myInfo,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.progressService.enrollCourse(myInfo, courseId);
  }

  @Get(':progressId')
  getLessonByProgressId(@Param('progressId', ParseIntPipe) progressId: number) {
    return this.progressService.getLessonByProgressId(progressId);
  }

  @Patch(':progressLessonId')
  submitLessonAnswer(
    @Param('progressLessonId', ParseIntPipe) progressLessonId: number,
    @Body() answerDtos: AnswerDto[],
  ) {
    return this.progressService.submitLessonAnswer(
      progressLessonId,
      answerDtos,
    );
  }

  @Get()
  getMyEnrolledCourse(@GetUser() myInfo) {
    return this.progressService.getMyEnrolledCourse(myInfo);
  }
}
