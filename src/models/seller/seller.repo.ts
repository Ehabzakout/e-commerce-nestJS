import { Model } from 'mongoose';
import { AbstractRepo } from '../abstract.repository';
import { Seller } from './seller.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SellerRepo extends AbstractRepo<Seller> {
  constructor(
    @InjectModel(Seller.name) private readonly SellerModel: Model<Seller>,
  ) {
    super(SellerModel);
  }
}
