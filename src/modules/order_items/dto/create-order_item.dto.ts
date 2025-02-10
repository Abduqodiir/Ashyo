import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Order ID',
    example: 1,
  })
  @IsNumber()
  order_id: number;

  @ApiProperty({
    description: 'Product Item ID',
    example: 1,
  })
  @IsNumber()
  product_item_id: number;

  @ApiProperty({
    description: 'Quantity of product items',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}
