import { CouponRepo } from 'src/models/coupon/coupon.repo';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { CouponEntity } from '../entities/coupon.entity';
import { TUser } from '@common/types';

export class CouponFactory {
  create(createCouponDTO: CreateCouponDto, user: TUser) {
    const coupon = new CouponEntity();
    coupon.code = createCouponDTO.code;
    coupon.active = true;
    coupon.from = createCouponDTO.from;
    coupon.to = createCouponDTO.to;
    coupon.discountAmount = createCouponDTO.discountAmount;
    coupon.discountType = createCouponDTO.discountType;
    coupon.use = [];
    coupon.createdBy = user._id;
    coupon.updatedBy = user._id;
    coupon.assignedTo = createCouponDTO.assignedTo;
    return coupon;
  }
}
