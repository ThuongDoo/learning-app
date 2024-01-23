import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/enum/role.enum';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  role: UserRole;
}
