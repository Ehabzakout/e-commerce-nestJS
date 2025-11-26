import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DISCOUNT_TYPE } from '@common/types/order.types';
import { SchemaTypes, Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema()
export class UserCoupon {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;
  @Prop({ type: Number })
  count: number;
}

@Schema({ timestamps: true })
export class Coupon {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true, length: 5, trim: true })
  code: string;

  @Prop({ type: Number, required: true, min: 1 })
  discountAmount: number;
  @Prop({
    type: String,
    enum: DISCOUNT_TYPE,
    default: DISCOUNT_TYPE.fixedAmount,
  })
  discountType: string;
  @Prop({ type: Date, required: true })
  from: Date;
  @Prop({ type: Date, required: true })
  to: Date;
  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: [UserCoupon], required: true })
  use: UserCoupon[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], required: true, ref: 'User' })
  assignedTo: Types.ObjectId[];
}

export const couponSchema = SchemaFactory.createForClass(Coupon);

couponSchema.post(/^find/, function (doc, next) {
  if (
    !doc.active ||
    doc.to < new Date(Date.now()) ||
    doc.from > new Date(Date.now())
  )
    throw new BadRequestException('Invalid Coupon or expired');
  next();
});
