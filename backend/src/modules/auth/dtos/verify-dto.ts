// src/modules/auth/dtos/verify-otp.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Email kiriting',
    example: 'your_email@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Tasdiqlash kodini kiriting',
    example: '123456',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  otp: string;
}
