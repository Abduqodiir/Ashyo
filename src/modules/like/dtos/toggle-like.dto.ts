import { IsNumber, IsPositive } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ToggleLikeDto {
  @ApiProperty({ description: "User ID" })
  @IsNumber()
  @IsPositive()
  userId: number

  @ApiProperty({ description: "Product ID" })
  @IsNumber()
  @IsPositive()
  productId: number
}

