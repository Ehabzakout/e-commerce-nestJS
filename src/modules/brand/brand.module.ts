import { forwardRef, Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand, BrandRepo, brandSchema, ProductRepo } from '@models';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandFactory } from './factory';
import { JwtModule, UserMongoModule } from '@shared/index';
import { ProductModule } from '@modules/product/product.module';
import { ProductService } from '@modules/product/product.service';

@Module({
  imports: [
    JwtModule,
    UserMongoModule,

    MongooseModule.forFeatureAsync([
      {
        name: Brand.name,
        imports: [forwardRef(() => ProductModule)],
        inject: [ProductRepo],
        useFactory: (productRepo: ProductRepo) => {
          const schema = brandSchema;
          schema.pre('findOneAndDelete', async function () {
            const filter = this.getFilter();
            await productRepo.deleteMany({ brand: filter._id });
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepo, BrandFactory],
  exports: [BrandService, BrandRepo, BrandFactory],
})
export class BrandModule {}
