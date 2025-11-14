import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandFactory } from './factory/index';
import { Auth } from '@common/decorators/auth.decorator';
import { User } from '@common/decorators/user.decorator';
import { type TUser } from '@common/types';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Public } from '@common/decorators/roles.decorator';

@Controller('brand')
@Auth(['Admin', 'Seller'])
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactory: BrandFactory,
  ) {}

  @Post('create')
  async create(@User() user: TUser, @Body() createBrandDTO: CreateBrandDto) {
    const brand = this.brandFactory.create(createBrandDTO, user);
    const newBrand = await this.brandService.create(brand);
    return { message: 'Brand created successfully', success: true, newBrand };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @User() user,
  ) {
    const brand = await this.brandFactory.update(updateBrandDto, id, user);
    await this.brandService.update(brand, id);
    return {
      message: 'Brand update successfully',
      success: true,
      updatedBrand: brand,
    };
  }

  @Get()
  @Public()
  async getAllBrands() {
    const brands = await this.brandService.getAll();
    return { message: 'success', success: true, brands };
  }

  @Get(':id')
  @Public()
  async getBrand(@Param('id') id: string) {
    const brand = await this.brandService.findOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: 'firstName lastName email -role' },
          { path: 'updatedBy', select: 'firstName lastName email -role' },
        ],
      },
    );
    return { message: 'success', success: true, brand };
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    const deletedBrand = await this.brandService.deleteBrand(id);
    return {
      message:
        "Your brand has been deleted successfully with it's related products",
      success: true,
      deletedBrand,
    };
  }
}
