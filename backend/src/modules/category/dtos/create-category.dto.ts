import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryRequest } from '../interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements CreateCategoryRequest {
  @ApiProperty({
    type: String,
    example: 'Phones',
    description: 'Category nomi berilishi shart',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Parent kategoriya ID (ixtiyoriy)',
    example: 1,
    required: false,
  })
  parentCategoryId?: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'Image yuklanishi shart',
    required: true,
  })
  image: any;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'Icon yuklanishi shart',
    required: true,
  })
  icon: any;
}
