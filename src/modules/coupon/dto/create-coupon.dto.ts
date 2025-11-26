import { IsValidDate } from '@common/decorators/valid-date.decorator';
import { IsValidDiscount } from '@common/decorators/valid-discount.decorator';
import { DISCOUNT_TYPE } from '@common/types/order.types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code: string;
  @IsNotEmpty()
  @IsNumber()
  @IsValidDiscount()
  discountAmount: number;
  @IsNotEmpty()
  @IsString()
  @IsEnum(DISCOUNT_TYPE)
  discountType: DISCOUNT_TYPE;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  @IsValidDate()
  from: Date;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  @IsValidDate()
  to: Date;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  assignedTo: Types.ObjectId[];
}
