import { Types } from 'mongoose';
import { CartEntity } from '../entities/cart.entity';

export class CartFactory {
  createCart(userId: Types.ObjectId) {
    const cart = new CartEntity();
    cart.userId = userId;
    cart.products = [];
    cart.createdBy = userId;
    cart.UpdatedBy = userId;
    return cart;
  }
}
