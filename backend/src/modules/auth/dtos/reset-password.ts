import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email kiriting',
    example: 'your_email@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail({}, { message: 'Email manzili noto‘g‘ri' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @ApiProperty({
    description: 'Tasdiqlash kodini kiriting',
    example: '123456',
    required: true,
    type: String,
  })
  @IsString({ message: 'Tasdiqlash kodi satr bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Tasdiqlash kodi kiritilishi shart' })
  otp: string;

  @ApiProperty({
    description: 'Yangi parolni kiriting',
    example: 'your_password',
    required: true,
    type: String,
  })
  @IsString({ message: 'Yangi parol satr bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Yangi parol kiritilishi shart' })
  @Length(8, 32, { message: 'Parol uzunligi 8 dan 32 gacha bo‘lishi kerak' })
  new_password: string;
}
