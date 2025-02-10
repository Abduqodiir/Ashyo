import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './models';
import { CreateCartItemDto } from './dto';
import { UpdateCartItemDto } from './dto';
import { Attributes } from 'sequelize';
import { Cart } from '../cart/models';
import { Product } from '../product';
import { User } from '../user';

@Injectable()
export class CartItemService {
  constructor(@InjectModel(CartItem) private readonly cartItemModel: typeof CartItem) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return this.cartItemModel.create(createCartItemDto as Attributes<CartItem>);
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemModel.findAll(
      {include: [
                { model: User},
                { model: Product },
              ]}
    );

    return this.cartItemModel.findAll();
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemModel.findByPk(id);
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found.`);
    }
    return cartItem;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.findOne(id);
    return cartItem.update(updateCartItemDto as Attributes<CartItem>);
  }

  async delete(id: number): Promise<void> {
    const cartItem = await this.findOne(id);
    await cartItem.destroy();
  }
}
