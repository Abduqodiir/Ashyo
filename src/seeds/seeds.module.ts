import { Module } from "@nestjs/common"
import { SeedsService } from "./seeds.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Banner, Brand, Category, Color, Product, ProductConfiguration, ProductItem, User, Variation, VariationOption } from "@modules";
@Module({
    imports: [SequelizeModule.forFeature([User,Category,Product,Brand,Banner,ProductItem,Color,Variation,VariationOption,ProductConfiguration])],
    providers: [SeedsService]
})
export class SeedsModule { }