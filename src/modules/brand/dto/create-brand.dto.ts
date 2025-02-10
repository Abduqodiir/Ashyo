import { ApiProperty } from '@nestjs/swagger';
import { CreateBrandRequest } from '../interfaces';
import { IsString } from 'class-validator';

export class CreateBrandDto implements Omit<CreateBrandRequest, 'image'> {
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
  image: string;
}
