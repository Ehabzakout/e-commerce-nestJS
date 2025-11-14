import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { BrandEntity } from '../entities/brand.entity';
import { BrandRepo, User } from '@models';
import { TUser } from '@common/types/user';
import { UpdateBrandDto } from '../dto/update-brand.dto';

import slugify from 'slugify';

@Injectable()
export class BrandFactory {
  constructor(private readonly brandRepo: BrandRepo) {}
  create(brandDTO: CreateBrandDto, user: TUser) {
    const brand = new BrandEntity();
    brand.name = brandDTO.name;
    brand.slug = slugify(brandDTO.name);
    brand.createdBy = user._id;
    brand.updatedBy = user._id;

    return brand;
  }
  async update(updateBrandDTO: UpdateBrandDto, id: string, user: TUser) {
    const existedBrand = await this.brandRepo.getOne({ _id: id });
    if (!existedBrand) throw new NotFoundException("Can't found brand");
    const brand = new BrandEntity();
    const brandName = updateBrandDTO.name || existedBrand.name;
    brand.name = brandName;
    brand.slug = slugify(brandName);
    brand.createdBy = existedBrand.createdBy;
    brand.updatedBy = user._id;

    return brand;
  }
}
