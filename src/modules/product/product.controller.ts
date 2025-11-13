import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactory } from './factory';
import { User } from '@common/decorators/user.decorator';
import { type TUser } from '@common/types';
import { Auth } from '@common/decorators/auth.decorator';

@Controller('product')
@Auth(['Admin', 'Seller'])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactory: ProductFactory,
  ) {}

  @Post('create')
  async create(
    @Body() createProductDto: CreateProductDto,
    @User() user: TUser,
  ) {
    const product = this.productFactory.create(createProductDto, user);
    const newProduct = await this.productService.create(product);
    return {
      message: 'Product created successfully',
      success: true,
      newProduct,
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
