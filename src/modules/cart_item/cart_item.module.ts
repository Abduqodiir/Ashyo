// src/modules/cart-item/cart-item.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './models';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';

@Module({
  imports: [SequelizeModule.forFeature([CartItem])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
