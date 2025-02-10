import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Like } from "./models";
import { CreateLikeDto, ToggleLikeDto, UpdateLikeDto } from "./dtos";
import { Product, ProductService } from "../product";
import { Sequelize } from "sequelize";

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like)
        private readonly likeModel: typeof Like,
        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService,
    ) { }

    async toggleLike(toggleLikeDto: ToggleLikeDto): Promise<{ message: string; isLiked: boolean }> {
        const { userId, productId } = toggleLikeDto

        const [like, created] = await this.likeModel.findOrCreate({
            where: { user_id: userId, product_id: productId },
        })

        if (!created) {
            await like.destroy()
        }

        const product = await this.productService.getSingleProduct(productId)
        if (!product) {
            throw new Error(`Product with ID ${productId} not found`)
        }

        product.is_liked = created
        await product.save()

        return {
            message: created ? "Product liked successfully" : "Product unliked successfully",
            isLiked: created,
        }
    }

    async getLikedProducts(userId: number) {
        return this.productService.findLikedByUser(userId)
    }

    async getLikedProductsIdsArray(userId: number) {
        const array = await this.productService.findLikedByUser(userId);
        const productIds = array.map(product => product?.dataValues?.id); 
        console.log(productIds);
        return productIds;
    }
    
    
    async getSingleLike(id: number): Promise<Like> {
        return this.likeModel.findOne({
            where: { id }
        })
    }

    async createLike(payload: CreateLikeDto): Promise<{ message: string; new_like: Like }> {
        const new_like = await this.likeModel.create({
            user_id: payload.user_id,
            product_id: payload.product_id
        })

        return {
            message: "Like created successfully!",
            new_like
        }
    }

    async updateLike(id: number, payload: UpdateLikeDto): Promise<{ message: string, updatedLike: Like }> {
        await this.likeModel.update(payload, { where: { id } })

        const updatedLike = await this.likeModel.findOne({ where: { id } })

        if (!updatedLike) throw new Error(`Like with ID ${id} not found`);

        return {
            message: "Like updated successfully",
            updatedLike
        }

    }

    async deleteLike(id: number): Promise<{ message: string }> {
        const like = await this.likeModel.findByPk(id)
        if (!like) return { message: `${id} raqamli Like topilmadi!!!` }
        await like.destroy()
        return {
            message: "Like deleted successfully"
        }

    }
}