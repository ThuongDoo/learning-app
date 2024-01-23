import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsNumber()
  courseId: number;

  description: string;
  video: string;
}
