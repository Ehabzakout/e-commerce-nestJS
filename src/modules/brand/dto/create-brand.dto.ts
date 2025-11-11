import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  slug: string;

  logo: string;
}
