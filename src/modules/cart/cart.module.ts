import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepo } from 'src/models/cart/cart.repo';
import { UserMongoModule } from '@shared/index';
import { ProductModule } from '@modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from 'src/models/cart/cart.schema';
import { CartFactory } from './factory';

@Module({
  imports: [
    UserMongoModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepo, CartFactory],
  exports: [CartService, CartRepo, CartFactory],
})
export class CartModule {}
