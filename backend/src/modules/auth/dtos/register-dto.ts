import { IsString, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto  {
    @ApiProperty({
        description: "Foydalanuvchi to'liq ismi",
        type: "string",
        required: true,
        example: "John Doe",
    })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({
        description: "Foydalanuvchi email manzili",
        type: "string",
        required: true,
        example: "john_doe@gmail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Foydalanuvchi uchun kuchli parol",
        type: "string",
        required: true,
        example: "Str0ng@Passw0rd!",
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    
}