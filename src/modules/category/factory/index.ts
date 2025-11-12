import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import slugify from 'slugify';
import { TUser } from '@common/types';
import { CategoryRepo } from 'src/models/category/category.repo';
import { UpdateCategoryDto } from './../dto/update-category.dto';

@Injectable()
export class CategoryFactory {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: TUser) {
    const existedCategory = await this.categoryRepo.getOne({
      slug: slugify(createCategoryDto.name),
    });

    if (existedCategory)
      throw new ConflictException('Category is already exist');

    const category = new CategoryEntity();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name);
    category.createdBy = user._id;
    category.updatedBy = user._id;

    return category;
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
    id: string,
    user: TUser,
  ) {
    const existedCategory = await this.categoryRepo.getOne({ _id: id });
    if (!existedCategory) throw new NotFoundException("Can't found category");
    const newName = updateCategoryDto.name || existedCategory.name;
    const category = new CategoryEntity();

    category.name = newName;
    category.slug = slugify(newName);
    category.createdBy = existedCategory.createdBy;
    category.updatedBy = user._id;
    return category;
  }
}
