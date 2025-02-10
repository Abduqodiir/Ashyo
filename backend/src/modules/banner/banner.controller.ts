import { Controller, Post, Get, Param, Body, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './dto';
import { Banner } from './model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Create a new banner' })
  @ApiResponse({ status: 201, description: 'Banner successfully created.', type: Banner })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createBannerDto: CreateBannerDto, @UploadedFile() image: Express.Multer.File): Promise<Banner> {
    return this.bannerService.create(createBannerDto, image);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  @ApiOperation({ summary: 'Retrieve all banners' })
  @ApiResponse({ status: 200, description: 'List of banners.', type: [Banner] })
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a banner by ID' })
  @ApiResponse({ status: 200, description: 'Banner details.', type: Banner })
  @ApiResponse({ status: 404, description: 'Banner not found.' })
  async findOne(@Param('id') id: number): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Put(':id')
  @ApiOperation({ summary: 'Update a banner by ID' })
  @ApiResponse({ status: 200, description: 'Banner successfully updated.', type: Banner })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Banner not found.' })
  async update(@Param('id') id: number, @Body() updateBannerDto: UpdateBannerDto): Promise<Banner> {
    return this.bannerService.update(id, updateBannerDto);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a banner by ID' })
  @ApiResponse({ status: 204, description: 'Banner successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Banner not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.bannerService.remove(id);
  }
}