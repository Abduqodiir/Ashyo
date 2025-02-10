import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { CreateProductItemDto } from './dto';
import { UpdateProductItemDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@Controller('product-items')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  create(@Body() createProductItemDto: CreateProductItemDto, @UploadedFile() file: Express.Multer.File) {
    console.log(createProductItemDto)
    return this.productItemService.create(createProductItemDto,file);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  findAll() {
    return this.productItemService.findAll();
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productItemService.findOne(+id);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  update(@Param('id') id: number, @Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update(+id, updateProductItemDto);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productItemService.delete(+id);
  }
}
