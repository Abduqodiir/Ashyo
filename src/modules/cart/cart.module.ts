import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Cart } from "./models";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";

@Module({
    imports: [SequelizeModule.forFeature([Cart])],
    providers: [CartService],
    controllers: [CartController]
})
export class CartModule { }