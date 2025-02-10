import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the user creating the order',
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    description: 'The ID of the address associated with the order',
    example: 5,
  })
  address_id: number;

  @ApiProperty({
    description: 'The current status of the order',
    enum: OrderStatus,
    example: OrderStatus.processing,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'The total price of the order',
    example: 150.75,
  })
  total_price: number;
}

