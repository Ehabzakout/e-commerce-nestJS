import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepo } from '@models';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepo: BrandRepo) {}

  async create(brand: BrandEntity) {
    const existedBrand = await this.brandRepo.getOne({ name: brand.name });
    if (existedBrand) throw new ConflictException('Brand is already exist');
    const newBrand = await this.brandRepo.create(brand);
    return newBrand;
  }
}
