import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';
export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Transform((value) => new Date(value.value))
  @IsDate()
  dob: Date;
}
