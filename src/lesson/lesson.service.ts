import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course, Lesson } from 'src/database/model';
import { CreateLessonDto } from './dto';
import { EditLessonDto } from './dto/edit-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson) private lessonModel: typeof Lesson,
    @InjectModel(Course) private courseModel: typeof Course,
  ) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const course = await this.courseModel.findByPk(createLessonDto.courseId);
    if (!course) {
      throw new NotFoundException('course id is not found');
    }
    const lesson = await this.lessonModel.create({
      title: createLessonDto.title,
      description: createLessonDto.description,
      duration: createLessonDto.duration,
      video: createLessonDto.video,
      courseId: createLessonDto.courseId,
    });
    return lesson;
  }

  async getLessonByCourseId(courseId: number) {
    return await this.lessonModel.findAll({ where: { courseId } });
  }

  async updateLesson(editLessonDto: EditLessonDto) {
    return this.lessonModel.update(
      {
        title: editLessonDto.title,
        description: editLessonDto.description,
        duration: editLessonDto.duration,
        video: editLessonDto.video,
      },
      { where: { id: editLessonDto.id } },
    );
  }

  async deleteLesson(id: number) {
    return this.lessonModel.destroy({ where: { id } });
  }
}
