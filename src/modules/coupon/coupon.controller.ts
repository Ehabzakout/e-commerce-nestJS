import { Controller, Post, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

import { Auth } from '@common/decorators/auth.decorator';
import { CouponFactory } from './factory';
import { type TUser } from '@common/types';
import { User } from '@common/decorators/user.decorator';

@Controller('coupon')
@Auth(['Admin'])
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly couponFactory: CouponFactory,
  ) {}

  @Post('create')
  async create(@Body() createCouponDto: CreateCouponDto, @User() user: TUser) {
    const coupon = this.couponFactory.create(createCouponDto, user);
    const newCoupon = await this.couponService.create(coupon);
    return {
      message: 'Coupon has been created successfully',
      success: true,
      newCoupon,
    };
  }
}
