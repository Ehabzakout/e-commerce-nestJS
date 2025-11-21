import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepo } from '../abstract.repository';
import { Coupon } from './coupon.schema';
import { Model } from 'mongoose';

export class CouponRepo extends AbstractRepo<Coupon> {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {
    super(couponModel);
  }
}
