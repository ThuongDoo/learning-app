import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditCourseDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
