import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class EditQuestionDto {
  questionText: string;

  @IsArray()
  @IsOptional()
  options: string[];

  @IsArray()
  @IsOptional()
  correctAnswers: number[];

  @IsNumber()
  id: number;
}
