import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Types } from 'mongoose';

export class AddToCartDtO {
  @IsNotEmpty()
  @IsMongoId()
  productId: Types.ObjectId;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;
}

export class ParamDTO {
  @IsMongoId()
  id: string;
}
