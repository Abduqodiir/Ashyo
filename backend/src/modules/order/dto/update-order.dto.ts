import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../enums";

export class UpdateOrderDto {
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
