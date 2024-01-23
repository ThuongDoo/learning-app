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
import { CourseService } from './course.service';
import { GetUser, Roles } from 'src/auth/decorator';
import { UserRole } from 'src/enum/role.enum';
import { CreateCourseDto, EditCourseDto } from './dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  createCourse(@Body() courseDto: CreateCourseDto, @GetUser() user) {
    return this.courseService.createCourse(courseDto, user);
  }

  @Get(':userId')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  getYourCourse(
    @Param('userId', ParseIntPipe) userId: number,
    @GetUser() user,
  ) {
    return this.courseService.getYourCourse(userId, user);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  getAllCourse() {
    return this.courseService.getAll();
  }

  @Patch()
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  updateCourse(@GetUser() myInfo, @Body() editCourseDto: EditCourseDto) {
    return this.courseService.updateCourse(myInfo, editCourseDto);
  }

  @Delete(':id')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteCourse(id);
  }
}
