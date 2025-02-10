import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models';
import { CreateCategoryRequest, UpdateCategoryRequest } from './interfaces';
import { FileService } from '../file';
import { Product } from '../product';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    private fileService: FileService,
  ) {}

  async getAllCategories(depth: number = 2, limit: number = 7): Promise<Category[]> {
    return await this.categoryModel.findAll({
        include: this.buildCategoryTree(depth),
        limit: limit
    });
}

  
  private buildCategoryTree(depth: number): any[] {
    if (depth === 0) return [];
    return [
      {
        model: Category,
        as: 'subCategories',
        include: this.buildCategoryTree(depth - 1),
      },
    ];
  }

  async createCategory(
    payload: CreateCategoryDto,
    imageFile: Express.Multer.File,
    iconFile: Express.Multer.File,
  ): Promise<{ message: string; category: Category }> {
    if (payload.parentCategoryId) {
      const parentCategory = await this.categoryModel.findByPk(payload.parentCategoryId);
      if (!parentCategory) {
        throw new Error(`Parent Category with id ${payload.parentCategoryId} not found`);
      }
    }
  
    const image = await this.fileService.uploadFile(imageFile);
    const icon = await this.fileService.uploadFile(iconFile);
  
    const category = await this.categoryModel.create({
      name: payload.name,
      image,
      icon,
      parentCategoryId: payload.parentCategoryId || null,
    });
    return {
      message: 'Category Created Successfully',
      category: category,
    };
  }

  async findByName(name: string): Promise<Category[]> {
    return this.categoryModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }

async getOneCategory(id: number): Promise<Category> {
  return await this.categoryModel.findOne({
    where: { id },
    include: [
      { model: Product },
      { model: Category, as: 'subCategories' },
    ],
  });
}


async updateCategory(
  id: number,
  payload: UpdateCategoryDto,
  imageFile?: Express.Multer.File,
  iconFile?: Express.Multer.File,
): Promise<{ message: string; updatedCategory: Category }> {
  const category = await this.categoryModel.findOne({ where: { id } });

  if (!category) {
    throw new Error(`Category with id ${id} not found`);
  }

  if (payload.parentCategoryId) {
    const parentCategory = await this.categoryModel.findByPk(payload.parentCategoryId);
    if (!parentCategory) {
      throw new Error(`Parent Category with id ${payload.parentCategoryId} not found`);
    }
  }

  if (imageFile) {
    const newImage = await this.fileService.uploadFile(imageFile);
    if (category.image) {
      await this.fileService.deleteFile(category.image);
    }
    payload.image = newImage;
  }

  if (iconFile) {
    const newIcon = await this.fileService.uploadFile(iconFile);
    if (category.icon) {
      await this.fileService.deleteFile(category.icon);
    }
    payload.icon = newIcon;
  }

  await this.categoryModel.update(payload, { where: { id } });

  const updatedCategory = await this.categoryModel.findOne({ where: { id } });

  return {
    message: 'Category updated successfully',
    updatedCategory,
  };
}
  async deleteCategory(id: number): Promise<void> {
    const foundedCategory = await this.categoryModel.findByPk(id);

    foundedCategory.destroy();
    await this.fileService.deleteFile(foundedCategory?.image);
    await this.fileService.deleteFile(foundedCategory?.icon);
  }
}
