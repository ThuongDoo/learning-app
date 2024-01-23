import { IsNumber, IsOptional } from 'class-validator';

export class EditLessonDto {
  title: string;
  description: string;
  video: string;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsNumber()
  id: number;
}
