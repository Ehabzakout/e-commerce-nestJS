import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand, BrandRepo, brandSchema } from '@models';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandFactory } from './factory';
import { JwtModule, UserMongoModule } from '@shared/index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]),
    JwtModule,
    UserMongoModule,
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepo, BrandFactory],
})
export class BrandModule {}
