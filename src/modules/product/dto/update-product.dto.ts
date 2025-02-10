import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsNumberString, IsBoolean } from "class-validator";
import { UpdateProductRequest } from "../interfaces/update-product.interface";

export class UpdateProductDto implements Omit<UpdateProductRequest, "image"> {
    @ApiProperty({
        type: String,
        required: false,
        example: 'iPhone 13 Pro',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
    })
    @IsOptional()
    @IsNumber()
    category_id?: number;

    @ApiProperty({
        type: String,
        required: false,
        example: 'Detailed description of the product',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        enum: ['Tolangan', 'Tolanmagan', 'On proccess'],
        required: false,
    })
    @IsOptional()
    @IsEnum(['Tolangan', 'Tolanmagan', 'On proccess'])
    nasiya?: 'Tolangan' | 'Tolanmagan' | 'On proccess';

    @ApiProperty({
        type: String,
        required: false,
        example: 'Brief summary of the product',
    })
    @IsOptional()
    @IsString()
    summary?: string;

    @ApiProperty({
        type: Number,
        required: false,
        example: 999,
    })
    @IsOptional()
    @IsNumberString()
    price?: number;

    @ApiProperty({
        type: Number,
        required: true,
        example: 4,
        maxLength: 5,
        minLength: 1,
    })
    @IsOptional()
    @IsNumberString()
    rating?: number;


    @ApiProperty({
        type: Boolean,
        required: false,
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    is_aksiya: boolean;

    @ApiProperty({
        type: Number,
        required: false,
        example: 1,
    })
    @IsOptional()
    @IsNumber()
    brand_id?: number;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: string;
}