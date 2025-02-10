import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CreateCartItemDto } from './dto';
import { UpdateCartItemDto } from './dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cart-item')
@ApiBearerAuth()
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiResponse({ status: 201, description: 'Cart item successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items.' })
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item details.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the cart item', example: 1 })
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartItemService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a cart item' })
  @ApiResponse({ status: 200, description: 'Cart item successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiParam({ name: 'id', description: 'The ID of the cart item', example: 1 })
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Delete a cart item' })
  @ApiResponse({ status: 200, description: 'Cart item successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the cart item', example: 1 })
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cartItemService.delete(id);
  }
}
