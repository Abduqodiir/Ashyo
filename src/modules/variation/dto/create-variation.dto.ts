import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class CreateVariationDto {
  @ApiProperty({
      description: 'Productga tegishli xususiyat Misol: Smartfon uchun RAM',
      example: "RAM",
      required: true,
      type: String,
    })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Product tegishli bo'lgan category ID si",
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category_id: number;
}
