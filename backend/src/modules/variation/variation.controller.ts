import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('variations')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  findAll() {
    return this.variationService.findAll();
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.variationService.findOne(+id);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.variationService.update(+id, updateVariationDto);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.variationService.delete(+id);
  }
}
