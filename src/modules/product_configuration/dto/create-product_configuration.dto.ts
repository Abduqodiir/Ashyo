import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateProductConfigurationDto {
  @ApiProperty({
    description: 'Product itemning IDsi',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  product_item_id: number;

  @ApiProperty({
    description: 'Variation Optionning IDsi',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  variation_option_id: number;
}