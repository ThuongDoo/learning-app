import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  questionText: string;

  @IsArray()
  options: string[];

  @IsArray()
  correctAnswers: number[];

  @IsNumber()
  lessonId: number;
}
