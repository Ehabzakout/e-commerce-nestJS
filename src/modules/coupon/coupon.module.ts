import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponRepo } from 'src/models/coupon/coupon.repo';
import { JwtModule, UserMongoModule } from '@shared/index';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, couponSchema } from 'src/models/coupon/coupon.schema';
import { CouponFactory } from './factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema }]),
    UserMongoModule,
    JwtModule,
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponRepo, CouponFactory],
  exports: [CouponService, CouponRepo, CouponFactory],
})
export class CouponModule {}
