import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from 'src/enum/role.enum';
import { CreateCourseDto, EditCourseDto } from './dto';
import { Course, Lesson } from 'src/database/model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseModel: typeof Course,
    @InjectModel(Lesson) private lessonModel: typeof Lesson,
  ) {}

  async createCourse(courseDto: CreateCourseDto, user): Promise<Course> {
    console.log(user);

    return this.courseModel.create({
      title: courseDto.title,
      description: courseDto.description,
      price: courseDto.price,
      ownerId: user.userId,
      lessons: courseDto.lessons,
    });
  }

  async getYourCourse(ownerId: number, user): Promise<Course[]> {
    if (user.role !== UserRole.ADMIN && user.userId !== ownerId) {
      throw new NotAcceptableException("user can't access this route");
    }

    const courses = await this.courseModel.findAll({ where: { ownerId } });
    return courses;
  }

  async updateCourse(myInfo, editCourseDto: EditCourseDto) {
    const course = await this.courseModel.findByPk(editCourseDto.id);
    if (!course) {
      throw new NotFoundException('course id is not exist');
    }
    if (myInfo.role !== UserRole.ADMIN && course.ownerId !== myInfo.userId) {
      throw new NotAcceptableException(
        'User can not change this course information',
      );
    }
    await course.update({
      title: editCourseDto.title,
      description: editCourseDto.description,
      price: editCourseDto.price,
    });
    return course;
  }

  async getAll() {
    return this.courseModel.findAll({});
  }

  async deleteCourse(id: number) {
    return this.courseModel.destroy({ where: { id } });
  }
}
