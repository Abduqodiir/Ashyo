import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({
    description: 'Region name',
    example: 'Toshkent viloyati'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'REGION ID',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  region_id: number | null;

  @ApiProperty({
    enum: ['CITY', 'DISTRICT', 'REGION'],
    description: 'Type of address',
    default: "REGION"
  })
  @IsEnum(['CITY', 'DISTRICT', 'REGION'])
  type: 'CITY' | 'DISTRICT' | 'REGION';
}