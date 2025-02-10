import { ApiProperty } from '@nestjs/swagger';
import { UpdateCategoryRequest } from '../interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto implements Omit<UpdateCategoryRequest, 'id'> {
  @ApiProperty({
    description: 'Category update name',
    required: false,
  })
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    example: 'Image updated to Another image',
    description: 'Category image updated',
    required: false,
  })
  image: string;

  @ApiProperty({
    description: 'Parent kategoriya ID (ixtiyoriy)',
    example: 2,
    required: false,
  })
  parentCategoryId?: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    example: 'Icons update',
    description: 'Category Icons update',
    required: false,
  })
  icon: string;
}
