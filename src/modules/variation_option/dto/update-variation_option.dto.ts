import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVariationOptionDto } from './create-variation_option.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateVariationOptionDto extends PartialType(
  CreateVariationOptionDto,
) {
  @ApiProperty({
    description:
      "Productga tegishli xususiyatni qiymati Misol: Smartfon uchun RAM xususiyati bo'lsa qiymati 8Gb",
    example: '8Gb',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiProperty({
    description: "Product tegishli bo'lgan xususiyatni ID si",
    example: 1,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  variation_id?: number;
}
