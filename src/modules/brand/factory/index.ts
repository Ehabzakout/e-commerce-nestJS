import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { BrandEntity } from '../entities/brand.entity';
import { User } from '@models';
import { TUser } from '@common/types/user';

@Injectable()
export class BrandFactory {
  create(brandDTO: CreateBrandDto, user: TUser) {
    const brand = new BrandEntity();
    brand.name = brandDTO.name;
    brand.slug = brandDTO.slug;
    brand.createdBy = user._id;
    brand.updatedBy = user._id;

    return brand;
  }
}
