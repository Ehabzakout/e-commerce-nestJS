import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { UserMongoModule } from '@shared/index';
import { CategoryFactory } from './factory';
import { CategoryRepo } from 'src/models/category/category.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from 'src/models/category/category.schema';
import { ProductRepo } from '@models';
import { ProductService } from '@modules/product/product.service';
import { ProductModule } from '@modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserMongoModule,

    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        imports: [forwardRef(() => ProductModule)],
        inject: [ProductRepo],
        useFactory: (productRepo: ProductRepo) => {
          const schema = categorySchema;

          schema.pre('findOneAndDelete', async function (next) {
            const filter = this.getFilter();

            if (!filter._id) next();
            await productRepo.deleteMany({ category: filter._id });
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactory, CategoryRepo],
  exports: [CategoryService, CategoryFactory, CategoryRepo],
})
export class CategoryModule {}
