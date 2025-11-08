import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  otp: string;
}

export class SendOtpDTO {
  @IsEmail()
  email: string;
}
