import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRegionDto {
  @ApiProperty({
    description: 'Region name',
    example: 'Toshkent viloyati'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'REGION ID',
    example: 1,
    required: true
  })
  @IsNumber()
  @IsOptional()
  region_id?: number | null;

  @ApiProperty({
    enum: ['CITY', 'DISTRICT', 'REGION'],
    description: 'Type of address',
    default: "REGION"
  })
  @IsEnum(['CITY', 'DISTRICT', 'REGION'])
  @IsOptional()
  type?: 'CITY' | 'DISTRICT' | 'REGION';
}