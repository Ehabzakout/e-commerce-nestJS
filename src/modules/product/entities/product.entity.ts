import { DISCOUNT_TYPE } from '@common/types';
import { Types } from 'mongoose';

export class ProductEntity {
  readonly _id: Types.ObjectId;

  name: string;
  slug: string;
  description: string;
  colors: string[];
  sizes: string[];
  price: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;

  stock: number;
  sold: number;
  category: Types.ObjectId;
  brand: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
