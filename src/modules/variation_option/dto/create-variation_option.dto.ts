import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateVariationOptionDto {
  @ApiProperty({
    description:
      "Productga tegishli xususiyatni qiymati Misol: Smartfon uchun RAM xususiyati bo'lsa qiymati 8Gb",
    example: '8Gb',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: "Product tegishli bo'lgan xususiyatni ID si",
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  variation_id?: number;
}