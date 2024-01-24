import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ValidationError } from 'sequelize';
import {
  Course,
  Lesson,
  Progress,
  ProgressLesson,
  Question,
  User,
} from 'src/database/model';
import { AnswerDto } from './dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress) private progressModel: typeof Progress,
    @InjectModel(Lesson) private lessonModel: typeof Lesson,
    @InjectModel(ProgressLesson)
    private progressLessonModel: typeof ProgressLesson,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Course) private courseModel: typeof Course,
    @InjectModel(Question) private questionModel: typeof Question,
  ) {}

  async enrollCourse(myInfo, courseId: number) {
    const user = await this.userModel.findByPk(myInfo.userId);
    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('course id is not found');
    }
    if (user.points - course.price < 0) {
      throw new BadRequestException('Not enough money to enroll in the course');
    }
    user.points -= course.price;
    await user.save();
    const progress = await this.progressModel
      .create({ userId: myInfo.userId, courseId })
      .catch((err) => {
        if (err instanceof ValidationError) {
          throw new ConflictException('course is already enrolled');
        }
        throw err;
      });

    const lessons = await this.lessonModel.findAll({ where: { courseId } });
    const data = lessons.map((lesson) => {
      return { lessonId: lesson.id, progressId: progress.id };
    });
    await this.progressLessonModel.bulkCreate(data);
    return progress;
  }

  async getMyEnrolledCourse(myInfo) {
    return this.progressModel.findAll({ where: { userId: myInfo.userId } });
  }

  async getLessonByProgressId(progressId: number) {
    return this.progressLessonModel.findAll({ where: { progressId } });
  }

  async updateProgressPercentage(progressId: number) {
    const progress = await this.progressModel.findByPk(progressId);
    const lessons = await this.progressLessonModel.findAll({
      where: { progressId },
    });
    const numOfCompleted = lessons.filter(
      (lesson) => lesson.isCompleted === true,
    ).length;
    const numOfCorrect = lessons.reduce((total, lesson) => {
      return (total += lesson.correctPercentage);
    }, 0);
    progress.completePercentage = numOfCompleted / lessons.length;
    progress.correctPercentage = numOfCorrect / lessons.length;
    await progress.save();
    return progress;
  }

  async submitLessonAnswer(progressLessonId: number, answerDtos: AnswerDto[]) {
    const checkAnswer = async (answer: AnswerDto) => {
      const question = questions.find((question) => question.id === answer.id);
      if (question) {
        const isCorrect =
          JSON.stringify(answer.answers) ===
          JSON.stringify(question.correctAnswers);
        if (isCorrect) {
          answer.isCorrect = true;
        } else {
          answer.isCorrect = false;
        }
      }
    };
    const progressLesson =
      await this.progressLessonModel.findByPk(progressLessonId);
    if (!progressLesson) {
      throw new NotFoundException('progress lesson is not found');
    }
    // update answers
    progressLesson.answers = [...answerDtos];
    progressLesson.isCompleted = true;

    const questions = await this.questionModel.findAll({
      where: { lessonId: progressLesson.lessonId },
    });
    // check answer
    await Promise.all(answerDtos.map((answer) => checkAnswer(answer)));

    // update correctPercentage
    const numOfCorrect = answerDtos.filter(
      (answer) => answer.isCorrect === true,
    ).length;
    progressLesson.correctPercentage = numOfCorrect / questions.length;
    await progressLesson.save();

    // update progress
    await this.updateProgressPercentage(progressLesson.progressId);

    return progressLesson;
  }
}
