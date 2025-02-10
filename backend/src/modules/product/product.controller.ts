import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './models';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductFilterDto } from './interfaces';
import { PaginatedResponse } from './interfaces/paginate-product.interface';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  #_service: ProductService;
  constructor(service: ProductService) {
    this.#_service = service;
  }

  @ApiOperation({
    summary: 'Get all products with optional filters, pagination and sorting',
  })
  @ApiQuery({ name: 'category_id', required: false, type: Number })
  @ApiQuery({ name: 'brand_id', required: false, type: Number })
  @ApiQuery({ name: 'min_price', required: false, type: Number })
  @ApiQuery({ name: 'max_price', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['price_asc', 'price_desc', 'rating_desc'],
    description: 'Sort by price (asc/desc) or rating',
  })
  @ApiQuery({
    name: 'variations',
    required: false,
    type: 'object',
    description:
      'Variation filters as key-value pairs (variation_id: option_id)',
  })
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  async getAllProducts(
    @Query('category_id') category_id?: number,
    @Query('brand_id') brand_id?: number,
    @Query('min_price') min_price?: number,
    @Query('max_price') max_price?: number,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: 'price_asc' | 'price_desc' | 'rating_desc',
    @Query('variations') variations?: string,
  ): Promise<PaginatedResponse<Product>> {
    const filters: ProductFilterDto = {
      category_id: category_id ? +category_id : undefined,
      brand_id: brand_id ? +brand_id : undefined,
      min_price: min_price ? +min_price : undefined,
      max_price: max_price ? +max_price : undefined,
      search,
      page: page ? +page : 1,
      limit: limit ? +limit : 10,
      sort,
      variations: variations ? JSON.parse(variations) : undefined,
    };

    return await this.#_service.getAllProducts(filters);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Get single product' })
  @Get('/:id')
  async getSingleProduct(@Param('id') id: string): Promise<Product> {
    return await this.#_service.getSingleProduct(+id);
  }

  @ApiOperation({ summary: 'Get top-rated discounted products' })
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get('/top-discounted')
  async getTopDiscountedProducts(): Promise<Product[]> {
    return this.#_service.getTopDiscountedProducts();
  }
  

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Create product' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() createProductPayload: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ message: string; new_product: Product }> {
    return await this.#_service.createProduct(createProductPayload, image);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Update product' })
  @ApiConsumes('multipart/form-data')
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductPayload: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ message: string; updatedProduct: Product }> {
    return await this.#_service.updateProduct(+id, updateProductPayload, file);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Delete product' })
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return await this.#_service.deleteProduct(+id);
  }

  @Protected(false)
@Roles([UserRoles.admin, UserRoles.user])
@ApiOperation({ summary: 'Toggle is_liked status for a product' })
@Patch('/:id/toggle-like')
async toggleProductLike(@Param('id') id: number): Promise<{ message: string; product: Product }> {
  return await this.#_service.toggleProductLike(id);
}

}
