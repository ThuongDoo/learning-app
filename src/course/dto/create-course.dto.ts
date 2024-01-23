import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Lesson } from 'src/database/model';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  ownerId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  lessons?: Lesson[];

  @IsNumber()
  @IsOptional()
  price?: number;
}
