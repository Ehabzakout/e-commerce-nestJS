import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { Product, ProductRepo } from '@models';
import { ProductEntity } from './entities/product.entity';

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
      createdBy: product.createdBy,
    });
    if (existedProduct) throw new ConflictException('Product is already exist');
    return await this.productRepo.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
