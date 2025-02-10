import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './models';
import { CreateRegionDto, UpdateRegionDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('region')
@ApiBearerAuth()
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // Region yaratish
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post('create-region')
  @ApiOperation({ summary: 'Create new region' })
  async createRegion(
    @Body() createRegionDto: CreateRegionDto,
  ): Promise<Region> {
    return this.regionService.createRegion(createRegionDto);
  }

  // Parent Regionlarni olish (masalan, Toshkent viloyati yoki Toshkent shahri)
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get('parent')
  @ApiOperation({ summary: 'Get parent regions' })
  @ApiResponse({
    status: 200,
    description: 'Parent regions list',
    type: Region,
    isArray: true
  })
  async getParentRegions(): Promise<Region[]> {
    return this.regionService.getParentRegions();
  }

  // Regionni ID bo'yicha olish
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  @ApiOperation({ summary: 'Get region by id' })
  async getRegionById(@Param('id', ParseIntPipe) id: number): Promise<Region> {
    return this.regionService.getRegionById(id);
  }

  // Barcha regionlarni olish
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  async getAllRegions(): Promise<Region[]> {
    return this.regionService.getAllRegions();
  }

  // Regionni yangilash
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Update region by id' })
  @Patch(':id')
  async updateRegion(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    return this.regionService.updateRegion(id, UpdateRegionDto);
  }

  // Regionni o'chirish
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete region' })
  async deleteRegion(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.regionService.deleteRegion(id);
  }
}
