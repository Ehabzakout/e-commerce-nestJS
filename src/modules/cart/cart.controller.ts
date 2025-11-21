import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';

import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth } from '@common/decorators/auth.decorator';
import { User } from '@common/decorators/user.decorator';
import { type TUser } from '@common/types';
import { AddToCartDtO, ParamDTO } from './dto/create-cart.dto';

@Controller('cart')
@Auth(['Admin', 'Seller', 'Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
  async addToCart(@Body() addToCartDtO: AddToCartDtO, @User() user: TUser) {
    await this.cartService.addProductToCart(addToCartDtO, user);

    return {
      message: 'Product has been added to your cart successfully',
      success: true,
    };
  }

  @Get()
  async getCart(@User() user: TUser) {
    const cart = await this.cartService.getCart(user);
    return { message: 'success', success: true, cart };
  }

  @Delete('/remove/:id')
  async remove(@Param() param: ParamDTO, @User() user: TUser) {
    await this.cartService.remove(param.id, user);
    return {
      message: 'You product has been removed from the cart',
      success: true,
    };
  }

  @Delete('/clear')
  async clearCart(@User() user: TUser) {
    await this.cartService.clearCart(user);
    return { message: 'Your cart is cleared successfully', success: true };
  }
}
