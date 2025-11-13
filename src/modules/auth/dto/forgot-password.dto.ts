import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class forgotPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  otp: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
