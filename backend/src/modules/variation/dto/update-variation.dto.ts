import { PartialType } from '@nestjs/mapped-types';
import { CreateVariationDto } from './create-variation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateVariationDto extends PartialType(CreateVariationDto) {
  @ApiProperty({
    description: 'Productga tegishli xususiyat Misol: Smartfon uchun RAM',
    example: 'RAM',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "Product tegishli bo'lgan category ID si",
    example: 1,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  category_id?: number;
}
