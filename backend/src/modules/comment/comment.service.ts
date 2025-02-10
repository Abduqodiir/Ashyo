import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./models";
import { CreateCommentDto, UpdateCommentDto } from "./dtos";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment) private commentModel: typeof Comment) { }

    async getAllComments(): Promise<Comment[]> {
        return await this.commentModel.findAll()
    }

    async getSingleComment(id: number): Promise<Comment> {
        return this.commentModel.findOne({
            where: { id }
        })
    }

    async createComment(payload: CreateCommentDto): Promise<{ message: string; new_comment: Comment }> {
        const new_comment = await this.commentModel.create({
            text: payload.text,
            user_id: payload.user_id,
            product_id: payload.product_id
        })

        return {
            message: "Comment created successfully!",
            new_comment
        }
    }

    async updateComment(id: number, payload: UpdateCommentDto): Promise<{ message: string, updatedComment: Comment }> {
        await this.commentModel.update(payload, { where: { id } })

        const updatedComment = await this.commentModel.findOne({ where: { id } })

        if (!updatedComment) throw new Error(`Comment with ID ${id} not found`);

        return {
            message: "Comment updated successfully",
            updatedComment
        }
    }

    async deleteComment(id: number): Promise<{ message: string }> {
        const comment = await this.commentModel.findByPk(id)
        if (!comment) return { message: `${id} raqamli Comment topilmadi!!!` }
        await comment.destroy()
        return {
            message: "Comment deleted successfully"
        }
    }
}