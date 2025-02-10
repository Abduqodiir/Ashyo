import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UpdateBrandRequest } from '../interfaces';

export class UpdateBrandDto implements Omit<UpdateBrandRequest, 'id'> {
  @ApiProperty({
    type: String,
    required: true,
    example: 'BMW',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  image?: string;
}
