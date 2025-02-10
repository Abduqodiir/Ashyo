import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'Region ID (null for Tashkent city)',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  region_id?: number;

  @ApiPropertyOptional({
    description: 'City ID',
    example: 2,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  city_id?: number | null;

  @ApiPropertyOptional({
    description: 'District ID',
    example: 3,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  district_id?: number | null;

  @ApiProperty({
    description: 'Street address',
    example: 'Amir Temur street, 15',
  })
  @IsNotEmpty()
  @IsString()
  street: string;
}
