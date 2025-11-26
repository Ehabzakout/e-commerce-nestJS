import { DISCOUNT_TYPE, PAYMENT_METHOD } from '@common/types/order.types';
import { CreateOrderDto } from '../dto/create-order.dto';
import {
  OrderCoupon,
  OrderEntity,
  ProductOrder,
} from '../entities/order.entity';

import { Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepo } from '@models';
import { CartService } from '@modules/cart/cart.service';
import { CouponService } from '@modules/coupon/coupon.service';
import { type TUser } from '@common/types';

type failedProduct = { product: Types.ObjectId | string; reason: string[] };

@Injectable()
export class OrderFactory {
  constructor(
    private readonly cartService: CartService,
    private readonly productRepo: ProductRepo,
    private readonly couponService: CouponService,
  ) {}

  // create order
  async create(createOrderDto: CreateOrderDto, user: TUser) {
    const order = new OrderEntity();

    const orderProducts = await this.getUserCartProducts(user);
    const coupon = createOrderDto.coupon
      ? await this.getCoupon(createOrderDto.coupon)
      : 'no coupon';

    order.address = createOrderDto.address;
    order.payment = createOrderDto.payment ?? PAYMENT_METHOD.cash;
    order.products = orderProducts.successProducts;
    order.userId = user._id;

    order.total = order.products.reduce(
      (acc, cur) => acc + cur.finalPrice * cur.quantity,

      0,
    );
    if (typeof coupon !== 'string') {
      order.coupon = new OrderCoupon();
      order.coupon.couponId = coupon?._id;
      order.coupon.code = coupon.code;

      order.coupon.amount =
        coupon.discountType === DISCOUNT_TYPE.fixedAmount
          ? coupon.discountAmount
          : (order.total * coupon.discountAmount) / 100;
    } else order.coupon = undefined;

    order.total = order.total - (order?.coupon?.amount ?? 0);
    return { order, failProducts: orderProducts.failedProducts };
  }

  // Prepare success and fail products
  async getUserCartProducts(user: TUser) {
    const successProducts: ProductOrder[] = [];
    const failedProducts: failedProduct[] = [];

    const cart = await this.cartService.getCart(user);
    if (!cart) throw new NotFoundException("Can't found Cart");

    for (const product of cart.products) {
      if (!product.productId) {
        failedProducts.push({
          product: product.productId,
          reason: ["Can't found this product or product has been deleted"],
        });
        continue;
      }
      const existedProduct = await this.productRepo.getOne({
        _id: product.productId,
      });
      if (!existedProduct) {
        failedProducts.push({
          product: product.productId._id,
          reason: ["Can't found this product"],
        });
        continue;
      }

      if (existedProduct.stock < product.quantity) {
        failedProducts.push({
          product: existedProduct._id,
          reason: ["we don't have enough quantity in our stock"],
        });
        continue;
      }
      const successProduct = {
        productId: existedProduct._id,
        quantity: product.quantity,
        price: existedProduct.price,
        discountAmount: existedProduct.discountAmount,
        discountType: existedProduct.discountType,
        finalPrice: existedProduct.finalPrice,
      };
      successProducts.push(successProduct);
    }
    return { failedProducts, successProducts };
  }

  async getCoupon(code: string) {
    return await this.couponService.getOne(code);
  }
}
