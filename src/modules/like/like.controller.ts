import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { Like } from './models';
import { CreateLikeDto, ToggleLikeDto, UpdateLikeDto } from './dtos';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }

  @Post('toggle')
  @Roles([UserRoles.user, UserRoles.admin])
  @ApiOperation({ summary: 'Toggle like for a product' })
  @ApiResponse({ status: 200, description: 'Like toggled successfully.' })
  async toggleLike(@Body() toggleLikeDto: ToggleLikeDto) {
    return this.likeService.toggleLike(toggleLikeDto);
  }

  @Get('user/:userId')
  @Roles([UserRoles.user, UserRoles.admin])
  @ApiOperation({ summary: 'Get liked products for a user' })
  @ApiResponse({ status: 200, description: 'Returns an array of liked products.' })
  async getLikedProducts(@Param('userId') userId: string) {
    return this.likeService.getLikedProducts(+userId);
  }

  @Get('usersLike/:userId')
  @Roles([UserRoles.user, UserRoles.admin])
  @ApiOperation({ summary: 'Get liked products for a user' })
  @ApiResponse({ status: 200, description: 'Returns an array of liked products.' })
  async getLikedProductsIdsArray(@Param('userId') userId: string) {
    return this.likeService.getLikedProductsIdsArray(+userId);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get('/:id')
  @ApiOperation({ summary: 'Get a single LIKE by ID' })
  async getSingleLike(@Param('id') id: string): Promise<Like> {
    return this.likeService.getSingleLike(+id);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Post('/add')
  @ApiOperation({ summary: 'Create a new like' })
  async createLike(@Body() payload: CreateLikeDto) {
    return this.likeService.createLike(payload);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Put('/update/:id')
  @ApiOperation({ summary: 'Update a like by ID' })
  async updateLike(@Param('id') id: string, @Body() payload: UpdateLikeDto) {
    return this.likeService.updateLike(+id, payload);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a like by ID' })
  async deleteLike(@Param('id') id: string) {
    const deleted = await this.likeService.deleteLike(+id);
    if (!deleted) throw new NotFoundException(`Like with ID ${id} not found`);
    return { message: 'Like deleted successfully' };
  }
}
