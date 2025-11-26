import { ORDER_STATUS, PAYMENT_METHOD } from '@common/types';
import { DISCOUNT_TYPE } from '@common/types';
import { Types } from 'mongoose';

export class Address {
  city: string;
  street: string;
  phone: string;
  code: string;
}

export class ProductOrder {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
  finalPrice: number;
}

export class OrderCoupon {
  couponId: Types.ObjectId;
  amount: number;
  discountType: DISCOUNT_TYPE;
  code: string;
}

export class OrderEntity {
  readonly _id: Types.ObjectId;
  userId: Types.ObjectId;
  address: Address;

  products: ProductOrder[];

  status: ORDER_STATUS;

  payment: PAYMENT_METHOD;

  coupon: OrderCoupon | undefined;

  total: number;
}
