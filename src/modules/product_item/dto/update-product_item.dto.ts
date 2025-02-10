import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductItemDto } from './create-product_item.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateProductItemDto extends PartialType(CreateProductItemDto) {
  @ApiPropertyOptional({
    description: 'Mahsulot variatsiyasining narxi (ixtiyoriy)',
    example: 1100,
    type: Number,
    minimum: 0.01,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    description: 'Mahsulot tasviriga havola (ixtiyoriy)',
    example: 'https://example.com/images/new-product.jpg',
    format: 'binary',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Tegishli mahsulotning IDsi (ixtiyoriy)',
    example: 2,
    type: Number,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  product_id?: number;

  @ApiProperty({
    description: 'Tegishli mahsulot rangini IDsi',
    example: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  color_id?: number;

   @ApiProperty({
      description: 'Mahsulotni yoqtirgan yoki yoqtirmaganligi',
      example: true,
      type: Boolean,
    })
    @IsOptional()
    @Transform(({ value }) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    })
    @IsBoolean()
    is_liked: boolean;
}
