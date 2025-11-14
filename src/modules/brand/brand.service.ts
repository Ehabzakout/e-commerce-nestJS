import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Brand, BrandRepo } from '@models';
import { BrandEntity } from './entities/brand.entity';
import { ProjectionType, QueryOptions, RootFilterQuery, Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepo: BrandRepo) {}

  async create(brand: BrandEntity) {
    const existedBrand = await this.brandRepo.getOne({ name: brand.name });
    if (existedBrand) throw new ConflictException('Brand is already exist');
    const newBrand = await this.brandRepo.create(brand);
    return newBrand;
  }

  async findOne(
    filter: RootFilterQuery<Brand>,
    projection?: ProjectionType<Brand>,
    options?: QueryOptions<Brand>,
  ) {
    const existedBrand = this.brandRepo.getOne(filter, projection, options);
    if (!existedBrand) throw new NotFoundException("Can't found brand");
    return existedBrand;
  }

  async update(brand: BrandEntity, id: string) {
    const existed = await this.brandRepo.getOne({
      slug: brand.slug,
      _id: { $ne: id },
    });
    if (existed) throw new ConflictException('Brand is already exist');
    await this.brandRepo.updateOne({ _id: id }, brand);
    return brand;
  }

  async getAll() {
    return await this.brandRepo.getMany(
      {},
      {},
      {
        populate: [
          {
            path: 'createdBy',
            select: 'firstName lastName email -role',
          },
          {
            path: 'updatedBy',
            select: 'firstName lastName email -role ',
          },
        ],
      },
    );
  }

  // Delete brand
  async deleteBrand(id: String) {
    const deletedBrand = await this.brandRepo.getOneAndDelete({ _id: id });
    if (!deletedBrand) throw new NotFoundException("Can't found brand");
    return deletedBrand;
  }
}
