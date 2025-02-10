import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductConfigurationService } from './product_configuration.service';
import { CreateProductConfigurationDto } from './dto/create-product_configuration.dto';
import { UpdateProductConfigurationDto } from './dto/update-product_configuration.dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('product-configuration')
export class ProductConfigurationController {
  constructor(
    private readonly productConfigurationService: ProductConfigurationService,
  ) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  create(@Body() createProductConfigurationDto: CreateProductConfigurationDto) {
    return this.productConfigurationService.create(
      createProductConfigurationDto,
    );
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  findAll() {
    return this.productConfigurationService.findAll();
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productConfigurationService.findOne(+id);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductConfigurationDto: UpdateProductConfigurationDto,
  ) {
    return this.productConfigurationService.update(
      +id,
      updateProductConfigurationDto,
    );
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productConfigurationService.remove(+id);
  }
}
