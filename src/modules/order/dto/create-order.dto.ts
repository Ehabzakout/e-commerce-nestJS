import { PAYMENT_METHOD } from '@common/types/order.types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  street: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class CreateOrderDto {
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsEnum(PAYMENT_METHOD)
  @IsOptional()
  payment: PAYMENT_METHOD;

  @IsString()
  @IsOptional()
  coupon: string;
}
