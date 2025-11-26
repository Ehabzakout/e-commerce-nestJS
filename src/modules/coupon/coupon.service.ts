import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponEntity } from './entities/coupon.entity';
import { CouponRepo } from 'src/models/coupon/coupon.repo';
import { Coupon } from 'src/models/coupon/coupon.schema';
import { Types } from 'mongoose';
import { TUser } from '@common/types';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepo: CouponRepo) {}
  async create(coupon: CouponEntity) {
    const existedCoupon = await this.couponRepo.getOne({
      code: coupon.code,
      active: true,
    });
    if (existedCoupon) throw new ConflictException('Coupon is already exist');
    const newCoupon = await this.couponRepo.create(coupon);
    return newCoupon;
  }

  async getOne(code: string): Promise<Coupon | string> {
    const coupon = await this.couponRepo.getOne({ code });
    if (coupon && coupon.active) return coupon;
    else return 'Invalid coupon';
  }

  async getAllCoupons() {
    return await this.couponRepo.getMany();
  }

  async remove(id: Types.ObjectId | string) {
    const deletedCoupon = await this.couponRepo.getOneAndDelete({
      _id: id,
    });
    if (!deletedCoupon) throw new NotFoundException("Can't found coupon");
    return deletedCoupon;
  }
}
