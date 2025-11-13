import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepo } from '../abstract.repository';
import { Product } from './product.schema';
import { Model } from 'mongoose';

export class ProductRepo extends AbstractRepo<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }
}
