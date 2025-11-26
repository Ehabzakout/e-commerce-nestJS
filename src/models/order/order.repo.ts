import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../abstract.repository';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderRepo extends AbstractRepo<Order> {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {
    super(orderModel);
  }
}
