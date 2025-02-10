import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Brand } from './models';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBrandRequest, UpdateBrandRequest } from './interfaces';
import { CreateBrandDto } from './dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Brand')
@Controller('/brands')
export class BrandController {
  #_brandService: BrandService;
  constructor(service: BrandService) {
    this.#_brandService = service;
  }
  @ApiBearerAuth()
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Brandni create qilish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ message: string }> {
    return await this.#_brandService.createBrand(createBrandDto, image);
  }

  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Hamma brandlarni olish' })
  @Get('/all')
  async getAllBrands(): Promise<Brand[]> {
    return this.#_brandService.getAllBrands();
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: '1 ta brandni olish' })
  @Get('/:brandId')
  async getSingleBrand(
    @Param('brandId') id: number
  ): Promise<Brand> {
    return await this.#_brandService.getSingleBrand(+id);
  }
  @ApiBearerAuth()
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Update brand' })
  @ApiConsumes('multipart/form-data')
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandPayload: UpdateBrandRequest,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ message: string; updatedBrand: Brand }> {
    const result = await this.#_brandService.updateBrand(
      +id,
      updateBrandPayload,
      file,
    );

    return {
      message: 'Brand successfully updated',
      updatedBrand: result.updatedBrand,
    };
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Brandni Ochirish' })
  @Delete(':id')
  @UseInterceptors(FileInterceptor('image'))
  async deleteBrand(@Param('id') id: string): Promise<{ message: string }> {
    return this.#_brandService.deleteBrand(+id);
  }
}
