import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MeService } from './me.service';
import { User } from './models';
import { Protected, Roles } from '@decorators';
import { UserRoles } from './enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('me')
@ApiBearerAuth()
@ApiTags('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.meService.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateData: Partial<User>) {
    try {
      const updatedUser = await this.meService.updateUser(id, updateData);
      if (!updatedUser)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
