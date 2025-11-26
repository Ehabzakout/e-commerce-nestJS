import {
  DISCOUNT_TYPE,
  ORDER_STATUS,
  PAYMENT_METHOD,
} from '@common/types/order.types';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ _id: false })
export class Address {
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  phone: string;
  @Prop({ type: String, required: true })
  code: string;
}

@Schema({
  _id: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ProductOrder {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number })
  discountAmount: number;
  @Prop({ type: String, enum: DISCOUNT_TYPE })
  discountType: DISCOUNT_TYPE;
  @Virtual({
    get: function (this: ProductOrder) {
      return this.price - this.discountAmount;
    },
  })
  finalPrice: number;
}

@Schema({ _id: false })
class OrderCoupon {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Coupon' })
  couponId: Types.ObjectId;
  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  code: string;
}

@Schema({ timestamps: true })
export class Order {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Customer' })
  userId: Types.ObjectId;
  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ type: [ProductOrder], required: true })
  products: ProductOrder[];

  @Prop({
    type: String,
    enum: ORDER_STATUS,
    default: function (this: Order) {
      if (this.payment === PAYMENT_METHOD.card) return ORDER_STATUS.pending;
      return ORDER_STATUS.placed;
    },
  })
  status: ORDER_STATUS;

  @Prop({ type: String, enum: PAYMENT_METHOD, default: PAYMENT_METHOD.cash })
  payment: PAYMENT_METHOD;

  @Prop({ type: OrderCoupon })
  coupon: OrderCoupon | undefined;

  @Prop({ type: Number, required: true })
  total: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);
