import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderFactory } from './factory';
import { User } from '@common/decorators/user.decorator';
import { Auth } from '@common/decorators/auth.decorator';
import { type TUser } from '@common/types';

@Controller('order')
@Auth(['Customer', 'Admin'])
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderFactory: OrderFactory,
  ) {}

  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto, @User() user: TUser) {
    const order = await this.orderFactory.create(createOrderDto, user);
    if (!order.order.products.length)
      return {
        message: 'fail to create order',
        success: false,
        failProducts: order.failProducts,
      };
    const createdOrder = await this.orderService.create(order.order);
    return {
      message: 'Order Created successfully',
      success: true,
      order: createdOrder,
      failProducts: order.failProducts,
    };
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
