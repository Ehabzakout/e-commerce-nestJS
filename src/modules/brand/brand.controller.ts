import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactory } from './factory/index';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { RolesGuard } from '@common/guards/role.guard';

@Controller('brand')
@Roles(['Admin', 'Seller', 'Customer'])
@UseGuards(AuthGuard, RolesGuard)
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactory: BrandFactory,
  ) {}

  @Post('create')
  create(@Req() req: any, @Body() createBrandDTO: CreateBrandDto) {
    const brand = this.brandFactory.create(createBrandDTO, req.user);
    const newBrand = this.brandService.create(brand);
    return { message: 'Brand created successfully', success: true, newBrand };
  }
}
