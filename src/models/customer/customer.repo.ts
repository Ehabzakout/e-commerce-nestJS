import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../abstract.repository';
import { Customer } from './customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerRepo extends AbstractRepo<Customer> {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {
    super(customerModel);
  }
}
