import { DISCOUNT_TYPE } from '@models';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes: string[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  discountAmount: number;

  @IsString()
  @IsEnum(DISCOUNT_TYPE)
  @IsOptional()
  discountType: DISCOUNT_TYPE;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsMongoId()
  @IsNotEmpty()
  category: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  brand: Types.ObjectId;
}
