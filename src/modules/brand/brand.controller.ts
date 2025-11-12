import { Controller, Post, Body } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandFactory } from './factory/index';
import { Auth } from '@common/decorators/auth.decorator';
import { User } from '@common/decorators/user.decorator';
import { type TUser } from '@common/types';

@Controller('brand')
@Auth(['Admin', 'Seller'])
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactory: BrandFactory,
  ) {}

  @Post('create')
  create(@User() user: TUser, @Body() createBrandDTO: CreateBrandDto) {
    const brand = this.brandFactory.create(createBrandDTO, user);
    const newBrand = this.brandService.create(brand);
    return { message: 'Brand created successfully', success: true, newBrand };
  }
}
