import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsNumberString, IsBoolean } from "class-validator";
import { CreateProductRequest } from "../interfaces/create-product.interface";
import { Transform } from "class-transformer";

export class CreateProductDto implements Omit<CreateProductRequest, "image"> {
    @ApiProperty({
        type: String,
        required: true,
        example: 'iPhone 13 Pro',
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
    })
    @IsNumberString()
    category_id: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Detailed description of the product',
    })
    @IsString()
    description: string;

    @ApiProperty({
        enum: ['3 oy', '6 oy', '12 oy'],
        required: true,
    })
    nasiya: 'Tolangan' | 'Tolanmagan' | 'On proccess';

    @ApiProperty({
        type: String,
        required: true,
        example: 'Brief summary of the product',
    })
    @IsString()
    summary: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 999,
    })
    @IsNumberString()
    price: number;

    @ApiProperty({
        type: Number,
        required: true,
        example: 4,
        maxLength: 5,
        minLength: 1,
    })
    @IsNumberString()
    rating: number;

    @ApiProperty({
        type: Boolean,
        required: false,
        example: false,
    })
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    is_aksiya: boolean;

    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
    })
    @IsNumberString()
    brand_id: number;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: string;
}