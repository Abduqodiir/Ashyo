import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './models/color.model';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Color')
@ApiBearerAuth()
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({
    status: 201,
    description: 'Color successfully created',
    type: Color,
  })
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorService.create(createColorDto);
  }

  @Protected(true)
  @Roles([UserRoles.admin])
  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({ status: 200, description: 'Return all colors', type: [Color] })
  findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }

  @Protected(true)
  @Roles([UserRoles.admin])
  @Get(':id')
  @ApiOperation({ summary: 'Get color by id' })
  @ApiResponse({ status: 200, description: 'Return color by id', type: Color })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Color> {
    return this.colorService.findOne(id);
  }

  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch(':id')
  @ApiOperation({ summary: 'Update color by id' })
  @ApiResponse({
    status: 200,
    description: 'Color successfully updated',
    type: Color,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<Color> {
    return this.colorService.update(id, updateColorDto);
  }

  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete color by id' })
  @ApiResponse({ status: 200, description: 'Color successfully deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.colorService.remove(id);
  }
}