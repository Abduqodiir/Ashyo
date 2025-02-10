import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./models";
import { ProductService } from "./product.service";
import { FileService } from "../file";
import { ProductController } from "./product.controller";
import { LikeModule } from "../like";

@Module({
    imports: [SequelizeModule.forFeature([Product]), forwardRef(() => LikeModule)],
    controllers: [ProductController],
    providers: [ProductService,FileService],
    exports: [ProductService],
})
export class ProductModule { }