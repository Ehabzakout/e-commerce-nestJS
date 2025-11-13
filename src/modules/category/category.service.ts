import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryRepo } from '@models';
import { CategoryEntity } from './entities/category.entity';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}
  async create(category: CategoryEntity) {
    const newCategory = await this.categoryRepo.create(category);
    return newCategory;
  }

  async findAll() {
    const categories = this.categoryRepo.getMany(
      {},
      {},
      {
        populate: [
          {
            path: 'updatedBy',
            select: {
              firstName: 1,
              lastName: 1,
              email: 1,
              role: 0,
              _id: 0,
            },
          },
          {
            path: 'createdBy',
            select: {
              firstName: 1,
              lastName: 1,
              email: 1,
              role: 0,
              _id: 0,
            },
          },
        ],
      },
    );
    return categories;
  }

  async findOne(id: string | Types.ObjectId) {
    const category = await this.categoryRepo.getOne(
      { _id: id },
      {},
      {
        populate: [
          {
            path: 'updatedBy',
            select: {
              firstName: 1,
              lastName: 1,
              email: 1,
              role: 0,
              _id: 0,
            },
          },
          {
            path: 'createdBy',
            select: {
              firstName: 1,
              lastName: 1,
              email: 1,
              role: 0,
              _id: 0,
            },
          },
        ],
      },
    );
    if (!category) throw new NotFoundException("can't found category");
    return category;
  }

  async update(category: CategoryEntity, id: string) {
    const exitedCategory = await this.categoryRepo.getOne({
      slug: category.slug,
      _id: { $ne: id },
    });
    if (exitedCategory)
      throw new ConflictException('this category is already exist');

    const updatedCategory = await this.categoryRepo.updateOne(
      { _id: id },
      category,
    );
    return updatedCategory;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
