import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductRepo, productSchema } from '@models';
import { ProductFactory } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@modules/category/category.module';
import { BrandModule } from '@modules/brand/brand.module';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    forwardRef(() => CategoryModule),
    forwardRef(() => BrandModule),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo, ProductFactory],
  exports: [ProductService, ProductRepo, ProductFactory],
})
export class ProductModule {}
