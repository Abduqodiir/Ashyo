import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Post()
  @ApiOperation({ summary: 'Create new address' })
  @ApiResponse({
    status: 201,
    description: 'Address has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data',
  })
  async create(@Body() createAddressDto: CreateAddressDto) {
    try {
      return await this.addressService.create(createAddressDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({
    status: 200,
    description: 'Return all addresses',
  })
  async findAll() {
    try {
      return await this.addressService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching addresses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  @ApiOperation({ summary: 'Get address by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Address ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Return address by id',
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const address = await this.addressService.findOne(id);
      if (!address) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      return address;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch(':id')
  @ApiOperation({ summary: 'Update address by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Address ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Address has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      const address = await this.addressService.update(id, updateAddressDto);
      if (!address) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      return address;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Error updating address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete address by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Address ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Address has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.addressService.remove(id);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error deleting address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}