import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductConfigurationDto } from './create-product_configuration.dto';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class UpdateProductConfigurationDto extends PartialType(
  CreateProductConfigurationDto,
) {
  @ApiProperty({
    description: 'Product itemning IDsi',
    example: 1,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  product_item_id: number;

  @ApiProperty({
    description: 'Variation Optionning IDsi',
    example: 1,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  variation_option_id: number;
}
