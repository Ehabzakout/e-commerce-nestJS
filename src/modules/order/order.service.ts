import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from 'src/models/order/order.schema';
import { OrderRepo } from 'src/models/order/order.repo';
import { ProductRepo } from '@models';
import { CartRepo } from 'src/models/cart/cart.repo';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepo,
    private readonly productRepo: ProductRepo,
    private readonly cartRepo: CartRepo,
  ) {}
  async create(order: Order) {
    const createdOrder = await this.orderRepo.create(order);
    for (const product of createdOrder.products) {
      await this.productRepo.updateOne(
        { _id: product.productId._id },
        { $inc: { stock: -product.quantity, sold: product.quantity } },
      );
    }
    await this.cartRepo.getOneAndDelete({ userId: createdOrder.userId });
    return createdOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
