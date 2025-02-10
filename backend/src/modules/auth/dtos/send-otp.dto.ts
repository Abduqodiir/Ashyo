import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class SendOTPDto {
  @ApiProperty({
    description: 'Email kiriting',
    example: 'your_email@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail({}, { message: 'Email manzili noto‘g‘ri' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;
}