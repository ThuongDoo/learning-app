import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AnswerDto {
  @IsNumber()
  id: number;

  @IsArray()
  answers: number[];

  @IsOptional()
  @IsBoolean()
  isCorrect: boolean;
}
