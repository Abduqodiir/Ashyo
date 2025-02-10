import { Attributes } from 'sequelize';
import { CartItem } from '../models';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto implements Partial<Attributes<CartItem>> {
  @ApiProperty({
    description: 'The ID of the cart',
    example: 1,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  cart_id?: number;

  @ApiProperty({
      description: 'The ID of the user',
      example: 1,
      required: false,
      type: Number,
    })
    @IsOptional()
    @IsPositive()
    user_id?: number;

  @ApiProperty({
    description: 'The ID of the product',
    example: 1,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  product_id?: number;

  @ApiProperty({
    description: 'The quantity of the product in the cart',
    example: 2,
    minimum: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'The price of the product',
    example: 29.99,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
}
