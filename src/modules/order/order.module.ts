import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderFactory } from './factory';
import { CartRepo } from 'src/models/cart/cart.repo';
import { ProductRepo } from '@models';
import { UserMongoModule } from '@shared/index';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, orderSchema } from 'src/models/order/order.schema';
import { CouponService } from '@modules/coupon/coupon.service';
import { ProductModule } from '@modules/product/product.module';
import { CartModule } from '@modules/cart/cart.module';
import { CouponModule } from '@modules/coupon/coupon.module';
import { OrderRepo } from 'src/models/order/order.repo';

@Module({
  imports: [
    UserMongoModule,
    ProductModule,
    CartModule,
    CouponModule,
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepo, OrderFactory, CouponService],
})
export class OrderModule {}
