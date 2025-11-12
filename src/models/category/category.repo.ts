import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepo } from '../abstract.repository';
import { Category } from './category.schema';
import { Model } from 'mongoose';

export class CategoryRepo extends AbstractRepo<Category> {
  constructor(@InjectModel(Category.name) categoryModel: Model<Category>) {
    super(categoryModel);
  }
}
