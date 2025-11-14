import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from '@common/decorators/auth.decorator';
import { CategoryFactory } from './factory';
import { type TUser } from '@common/types';
import { User } from '@common/decorators/user.decorator';
import { Public } from '@common/decorators/roles.decorator';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactory: CategoryFactory,
  ) {}

  @Post('create')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: TUser,
  ) {
    const category = await this.categoryFactory.createCategory(
      createCategoryDto,
      user,
    );
    const newCategory = await this.categoryService.create(category);
    return {
      message: 'Category Created Successfully',
      success: true,
      newCategory,
    };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: TUser,
  ) {
    const category = await this.categoryFactory.updateCategory(
      updateCategoryDto,
      id,
      user,
    );

    const updatedCategory = await this.categoryService.update(category, id);

    return {
      message: 'category Updated successfully',
      success: true,
      updatedCategory,
    };
  }

  @Get()
  @Public()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return { success: true, categories };
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return { message: 'success', success: true, category };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedCategory = await this.categoryService.remove(id);
    return {
      message: 'You category has been deleted and related products',
      success: true,
      deletedCategory,
    };
  }
}
