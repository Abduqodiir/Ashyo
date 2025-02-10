import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiPropertyOptional({
    description: 'Region ID (null for Tashkent city)',
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  region_id?: number | null;

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

  @ApiPropertyOptional({
    description: 'Street address',
    example: 'Amir Temur street, 15',
  })
  @IsOptional()
  @IsString()
  street?: string;
}