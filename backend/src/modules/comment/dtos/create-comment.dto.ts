import { IsNumber, IsString } from "class-validator";
import { CreateCommentRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto implements CreateCommentRequest {
    @ApiProperty({
        description: "Comment yozing",
        example: "zor telefon ekan",
        required: true,
        type: String
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: 'Foydalanuvchi ID raqami',
        example: 1,
        required: true,
        type: Number,
    })
    @IsNumber()
    user_id: number;

    @ApiProperty({
        description: 'Mahsulot ID raqami',
        example: 1,
        required: true,
        type: Number,
    })
    @IsNumber()
    product_id: number;
}