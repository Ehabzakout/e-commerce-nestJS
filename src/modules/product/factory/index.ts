import { TUser } from '@common/types';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import slugify from 'slugify';
import { Types } from 'mongoose';

export class ProductFactory {
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
}
