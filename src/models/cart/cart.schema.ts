import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Product } from '../product/product.schema';

export class CartProduct {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Product' })
  productId: Types.ObjectId | Product;
  @Prop({ type: Number, default: 1 })
  quantity: number;
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Cart {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: [CartProduct] })
  products: CartProduct[];

  @Virtual({
    get: function (this: Cart) {
      return this.products.length;
    },
  })
  totalItems: number;

  @Virtual({
    get: function (this: Cart) {
      let total = 0;
      this.products.forEach(
        (product: CartProduct) =>
          //@ts-expect-error
          (total += product.productId.finalPrice * product.quantity),
      );
      return total;
    },
  })
  totalPrice: number;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
cartSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: 'products.productId',
    model: 'Product',
  });
  next();
});
