import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Like } from "./models";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { ProductModule } from "../product";

@Module({
    imports: [SequelizeModule.forFeature([Like]), forwardRef(() => ProductModule)],
    controllers: [LikeController],
    providers: [LikeService],
    exports: [LikeService],
})

export class LikeModule { }