import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDtO } from './dto/create-cart.dto';
import { TUser } from '@common/types';
import { ProductService } from '@modules/product/product.service';
import { CartRepo } from './../../models/cart/cart.repo';
import { Types, HydratedDocument, Model } from 'mongoose';
import { CartFactory } from './factory';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly CartRepo: CartRepo,
    private readonly cartFactory: CartFactory,
  ) {}
  async addProductToCart(addToCartDTO: AddToCartDtO, user: TUser) {
    // get product to add
    const product = await this.productService.findOne(addToCartDTO.productId);

    // check on stock
    if (product.stock < addToCartDTO.quantity)
      throw new NotAcceptableException("We don't have enough quantity");

    // check if user have a cart
    const existedCart = await this.CartRepo.getOne({ userId: user._id });

    // if user doesn't have a cart create one with the product
    if (!existedCart) {
      const cart = this.cartFactory.createCart(user._id);
      cart.products.push({
        productId: product._id,
        quantity: addToCartDTO.quantity ?? 1,
      });
      const newCart = await this.CartRepo.create(cart);
      return newCart;
    }

    // if user have the cart check if cart contain product or not
    const findIndex = existedCart.products.findIndex(
      (prod) => prod.productId._id.toString() === product._id.toString(),
    );

    // If product doesn't exist in the cart add new one
    if (findIndex === -1) {
      if (product.stock < 1)
        throw new NotAcceptableException("We don't have enough quantity");
      return await this.CartRepo.updateOne(
        { _id: existedCart._id },
        {
          $push: {
            products: {
              productId: product._id,
              quantity: addToCartDTO.quantity ?? 1,
            },
          },
        },
        { new: true },
      );
    }
    // If product  exists in the cart update quantity
    else {
      const newQuantity =
        addToCartDTO.quantity || existedCart.products[findIndex].quantity + 1;

      // if doesn't have the quantity in stock throw error
      if (product.stock < newQuantity)
        throw new NotAcceptableException("We don't have enough quantity");

      // update
      return await this.CartRepo.updateOne(
        { _id: existedCart._id },
        { $set: { [`products.${findIndex}.quantity`]: newQuantity } },
      );
    }
  }

  async getCart(user: TUser) {
    const cart = await this.CartRepo.getOne({ userId: user._id });
    if (!cart) throw new NotFoundException('There is now cart or Empty');
    return cart;
  }

  async remove(id: string, user: TUser) {
    const cart = await this.getCart(user);
    const findIndex = cart.products.findIndex(
      (prod) => prod.productId._id.toString() === id,
    );
    if (findIndex === -1)
      throw new NotFoundException("Can't found this product in your cart");

    return await this.CartRepo.updateOne(
      { _id: cart._id },
      {
        $pull: {
          products: {
            productId: cart.products[findIndex].productId._id,
            quantity: cart.products[findIndex].quantity,
          },
        },
      },
    );
  }

  async clearCart(user: TUser) {
    const cart = await this.getCart(user);
    if (!cart.products.length)
      throw new BadRequestException('Your cart is already empty');
    return await this.CartRepo.updateOne(
      { _id: cart._id },
      { $set: { products: [] } },
    );
  }
}
