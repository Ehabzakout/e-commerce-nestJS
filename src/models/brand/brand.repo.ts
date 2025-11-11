import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../abstract.repository';
import { Brand } from './brand.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandRepo extends AbstractRepo<Brand> {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {
    super(brandModel);
  }
}
