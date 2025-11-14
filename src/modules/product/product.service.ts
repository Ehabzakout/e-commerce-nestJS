import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { Product, ProductRepo } from '@models';
import { ProductEntity } from './entities/product.entity';
import { RootFilterQuery, Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: ProductEntity) {
    await this.categoryService.findOne(product.category);
    await this.brandService.findOne(product.brand);
    const existedProduct = await this.productRepo.getOne({
      slug: product.slug,
      $or: [{ createdBy: product.createdBy }, { updatedBy: product.updatedBy }],
    });
    if (existedProduct) return this.update(existedProduct._id, product);
    return await this.productRepo.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string | Types.ObjectId) {
    const product = await this.productRepo.getOne({ _id: id });
    if (!product) throw new NotFoundException('Can;t found product');
    return product;
  }

  async update(id: string | Types.ObjectId, product: ProductEntity) {
    const existedProduct = await this.findOne(id);

    const colors = this.createSet(existedProduct.colors, product.colors);
    const sizes = this.createSet(existedProduct.sizes, product.sizes);
    product.colors = Array.from(colors);
    product.sizes = Array.from(sizes);
    await this.productRepo.updateOne({ _id: existedProduct._id }, product);
    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async deleteManyProducts(filter: RootFilterQuery<Product>) {
    return await this.productRepo.deleteMany(filter);
  }

  createSet<T>(oldData: T[], newData: T[]) {
    const items = new Set(oldData);
    newData.forEach((item) => items.add(item));
    return items;
  }
}
