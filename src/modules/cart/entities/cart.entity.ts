import { Types } from 'mongoose';
import { CartProduct } from 'src/models/cart/cart.schema';

export class CartEntity {
  userId: Types.ObjectId;
  products: CartProduct[];
  totalItems: number;
  totalPrice: number;
  createdBy: Types.ObjectId;
  UpdatedBy: Types.ObjectId;
}
