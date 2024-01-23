import { IsNumber } from 'class-validator';

export class EditUserDto {
  @IsNumber()
  id: number;

  firstName: string;
  lastName: string;
  photo: string;
}
