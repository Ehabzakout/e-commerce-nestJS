import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../abstract.repository';
import { Admin } from './admin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminRepo extends AbstractRepo<Admin> {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {
    super(adminModel);
  }
}
