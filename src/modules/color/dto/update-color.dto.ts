import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateColorDto {
    @ApiProperty({
        type: String,
        required: true,
        example: 'black',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '#000000',
    })
    @IsOptional()
    @IsString()
    color_code?: string;
}
