import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './models';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({
    description: 'Barcha kategoriyalarni daraxt ko‘rinishida olish',
    summary: 'Kategoriyalarni daraxt ko‘rinishida olish',
  })
  @Get('/all')
  async getAllCategories(@Query('limit') limit?: number): Promise<Category[]> {
    return this.categoryService.getAllCategories(2, limit || 7);
  }


  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Kategoriya yaratish' })
  @Protected(true)
  @Roles([UserRoles.admin])
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  @Post('/add')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles()
    files: { image: Express.Multer.File; icon: Express.Multer.File },
  ): Promise<{ message: string; category: Category }> {
    return this.categoryService.createCategory(
      createCategoryDto,
      files.image[0],
      files.icon[0],
    );
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({
    description: `Kategoriyalarni nomi bo'yicha qidirib topib beradi. Misol: 'Tel' deb qidirsa 'Telefon' yoki 'Televizor' chiqaradi`,
    summary: `Kategoriyalarni nomi bo'yicha qidirish`,
  })
  @Get("/search")
  async findByName(@Query('name') name: string): Promise<Category[]> {
    return this.categoryService.findByName(name);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({
    summary: 'Bitta kategoriyani barcha ichki kategoriyalari bilan olish',
  })
  @Get('/:categoryId')
  async getOneCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Category> {
    return this.categoryService.getOneCategory(categoryId);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Categoryni Update qilish' })
  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch('/update/:categoryId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  async updateCategory(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; icon?: Express.Multer.File[] },
    @Body() updateCategoryPayload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<{ message: string; updatedCategory: Category }> {
    const imageFile = files?.image?.[0];
    const iconFile = files?.icon?.[0];

    return this.categoryService.updateCategory(
      categoryId,
      updateCategoryPayload,
      imageFile,
      iconFile,
    );
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({
    summary: 'Categoryni Ochirib tashlash',
  })
  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.categoryService.deleteCategory(categoryId);
  }
}
