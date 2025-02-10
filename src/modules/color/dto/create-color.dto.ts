import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateColorDto {
    @ApiProperty({
        type: String,
        required: true,
        example: 'aqua',
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '#00ffff',
    })
    @IsString()
    color_code: string;
}