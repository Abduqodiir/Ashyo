import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({ example: 'John Doe', description: 'Foydalanuvchi ismi' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Foydalanuvchi emaili' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Mening savolim...', description: 'Murojaat matni' })
    @IsString()
    @IsNotEmpty()
    message: string;
}
