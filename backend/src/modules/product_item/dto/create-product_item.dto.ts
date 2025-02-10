import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductItemDto {
  @ApiProperty({
    description: 'Mahsulot variatsiyasining narxi',
    example: 1050,
    type: Number,
    minimum: 0.01,
  })
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty({
    example: 'https://example.com/images/product.jpg',
    description: 'Mahsulot tasviriga havola',
    format: 'binary',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Tegishli mahsulotning IDsi',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;

  @ApiProperty({
    description: 'Tegishli mahsulot rangini IDsi',
    example: 1,
    type: Number,
  })
  
  @IsNotEmpty()
  @IsNumberString()
  color_id: number;

  @ApiProperty({
    description: 'Mahsulotni yoqtirgan yoki yoqtirmaganligi',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  is_liked: boolean;
}