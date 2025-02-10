import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comment } from "./models";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";

@Module({
    imports: [SequelizeModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController]
})
export class CommentModule { }