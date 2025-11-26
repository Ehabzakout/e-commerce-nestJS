import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

import { Auth } from '@common/decorators/auth.decorator';
import { CouponFactory } from './factory';
import { type TUser } from '@common/types';
import { User } from '@common/decorators/user.decorator';
import { ParamDTO } from '@common/dto';

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
  @Get(':code')
  async getCoupon(@Param('code') code: string) {
    const coupon = await this.couponService.getOne(code);
    return { success: true, coupon };
  }

  @Get()
  async getAllCoupons() {
    const coupons = await this.couponService.getAllCoupons();
    return { success: true, coupons };
  }
  @Delete(':id')
  async deleteCoupon(@Param() paramDto: ParamDTO) {
    const id = paramDto.id;
    const coupon = await this.couponService.remove(id);
    return {
      message: 'Coupon has deleted successfully',
      success: true,
      coupon,
    };
  }
}
