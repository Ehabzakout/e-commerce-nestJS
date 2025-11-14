import { TUser } from '@common/types';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import slugify from 'slugify';
import { Types } from 'mongoose';
import { ProductService } from '../product.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepo } from '@models';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductFactory {
  constructor(private readonly productService: ProductService) {}
  create(createProductDto: CreateProductDto, user: TUser) {
    const product = new ProductEntity();
    product.name = createProductDto.name;
    product.slug = slugify(createProductDto.name);
    product.description = createProductDto.description;
    product.brand = new Types.ObjectId(createProductDto.brand);
    product.category = new Types.ObjectId(createProductDto.category);
    product.colors = createProductDto.colors;
    product.sizes = createProductDto.sizes;
    product.price = createProductDto.price;
    product.discountAmount = createProductDto.discountAmount;
    product.discountType = createProductDto.discountType;
    product.stock = createProductDto.stock;
    product.sold = 0;
    product.createdBy = user._id;
    product.updatedBy = user._id;

    return product;
  }
  async update(id: string, updateDTO: UpdateProductDto, user: TUser) {
    const existedProduct = await this.productService.findOne(id);
    const product = new ProductEntity();
    const newName = updateDTO.name || existedProduct.name;
    product.name = newName;
    product.slug = slugify(newName);
    product.description = updateDTO.description || existedProduct.description;
    product.brand = new Types.ObjectId(updateDTO.brand) || existedProduct.brand;
    product.category =
      new Types.ObjectId(updateDTO.category) || existedProduct.category;
    product.colors = updateDTO.colors || existedProduct.colors;
    product.sizes = updateDTO.sizes || existedProduct.sizes;
    product.price = updateDTO.price || existedProduct.price;
    product.discountAmount =
      updateDTO.discountAmount || existedProduct.discountAmount;
    product.discountType =
      updateDTO.discountType || existedProduct.discountType;
    product.stock = updateDTO.stock || existedProduct.stock;
    product.sold = updateDTO.stock || existedProduct.sold;
    product.createdBy = user._id;
    product.updatedBy = user._id;

    return product;
  }
}
