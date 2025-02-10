import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { OrderItems } from './models';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Order Items')
@ApiBearerAuth()
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({
    status: 201,
    description: 'The order item has been successfully created.',
    type: OrderItems,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({
    status: 200,
    description: 'Return all order items',
    type: [OrderItems],
  })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  @ApiOperation({ summary: 'Get a single order item by id' })
  @ApiParam({ name: 'id', description: 'Order item ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the order item',
    type: OrderItems,
  })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }
}
