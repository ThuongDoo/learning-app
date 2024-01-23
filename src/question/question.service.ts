import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson, Question } from 'src/database/model';
import { CreateQuestionDto } from './dto';
import { EditQuestionDto } from './dto/edit-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Lesson) private lessonModel: typeof Lesson,
    @InjectModel(Question) private questionModel: typeof Question,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const lesson = await this.lessonModel.findByPk(createQuestionDto.lessonId);
    if (!lesson) {
      throw new NotFoundException('lesson id is not found');
    }
    // return createQuestionDto;

    return this.questionModel.create({
      questionText: createQuestionDto.questionText,
      options: createQuestionDto.options,
      correctAnswers: createQuestionDto.correctAnswers,
      lessonId: createQuestionDto.lessonId,
    });
  }

  async getQuestionByLessonId(id: number) {
    return this.questionModel.findAll({ where: { lessonId: id } });
  }

  async updateQuestion(editQuestionDto: EditQuestionDto) {
    return this.questionModel.update(
      {
        questionText: editQuestionDto.questionText,
        options: editQuestionDto.options,
        correctAnswers: editQuestionDto.correctAnswers,
      },
      { where: { id: editQuestionDto.id } },
    );
  }

  async deleteQuestion(id: number) {
    return this.questionModel.destroy({ where: { id } });
  }

  async updateManyQuestions(lessonId: number, createQuestionDtos) {
    const lesson = await this.lessonModel.findByPk(lessonId);
    if (!lesson) {
      throw new NotFoundException('lesson id is not found');
    }
    await this.questionModel.destroy({ where: { lessonId } });

    return this.questionModel.bulkCreate(createQuestionDtos);
  }
}
