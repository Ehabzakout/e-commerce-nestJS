import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponEntity } from './entities/coupon.entity';
import { CouponRepo } from 'src/models/coupon/coupon.repo';

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

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
