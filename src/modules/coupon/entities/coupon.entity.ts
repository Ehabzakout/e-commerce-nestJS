import { DISCOUNT_TYPE } from '@common/types';
import { Types } from 'mongoose';
import { UserCoupon } from 'src/models/coupon/coupon.schema';

export class CouponEntity {
  code: string;

  discountAmount: number;

  discountType: DISCOUNT_TYPE;
  from: Date;
  to: Date;
  active: boolean;
  use: UserCoupon[];

  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;

  assignedTo: Types.ObjectId[];
}
