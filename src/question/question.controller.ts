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
import { QuestionService } from './question.service';
import { Roles } from 'src/auth/decorator';
import { UserRole } from 'src/enum/role.enum';
import { CreateQuestionDto } from './dto';
import { EditQuestionDto } from './dto/edit-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get(':lessonId')
  getQuestionByLessonId(@Param('lessonId', ParseIntPipe) id: number) {
    return this.questionService.getQuestionByLessonId(id);
  }

  @Delete(':questionId')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  delteQuestion(@Param('questionId', ParseIntPipe) id: number) {
    return this.questionService.deleteQuestion(id);
  }

  @Patch()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  updateQuestion(@Body() editQuestionDto: EditQuestionDto) {
    return this.questionService.updateQuestion(editQuestionDto);
  }

  @Post('/update-many/:lessonId')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  updateManyQuestions(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() createQuestionDtos: CreateQuestionDto[],
  ) {
    return this.questionService.updateManyQuestions(
      lessonId,
      createQuestionDtos,
    );
  }
}
