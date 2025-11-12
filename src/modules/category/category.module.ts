import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { UserMongoModule } from '@shared/index';
import { CategoryFactory } from './factory';
import { CategoryRepo } from 'src/models/category/category.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from 'src/models/category/category.schema';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactory, CategoryRepo],
})
export class CategoryModule {}
