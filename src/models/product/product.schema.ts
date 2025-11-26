import { DISCOUNT_TYPE } from '../../common/types/order.types';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  readonly _id: Types.ObjectId;
  // product data
  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  })
  slug: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 30,
  })
  description: string;
  //proprieties
  @Prop({ type: [String] })
  colors: string[];
  @Prop({ type: [String] })
  sizes: string[];

  // numbers
  @Prop({
    type: Number,
    min: 1,
    required: true,
  })
  price: number;
  @Prop({
    type: Number,
    min: 0,
    default: 0,
  })
  discountAmount: number;
  @Prop({
    type: String,
    enum: DISCOUNT_TYPE,
    default: DISCOUNT_TYPE.fixedAmount,
  })
  discountType: DISCOUNT_TYPE;

  @Virtual({
    get: function (this: Product) {
      if (this.discountType == DISCOUNT_TYPE.fixedAmount)
        return this.price - this.discountAmount;
      return this.price - (this.price * this.discountAmount) / 100;
    },
  })
  finalPrice: number;

  @Prop({
    type: Number,
    min: 0,
    default: 1,
  })
  stock: number;
  @Prop({
    type: Number,
    min: 0,
    default: 0,
  })
  sold: number;

  //  Ids
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);
