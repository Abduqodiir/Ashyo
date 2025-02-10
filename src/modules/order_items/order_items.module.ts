import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItems } from './models';
import { ProductItem } from '../product_item';
import { Order } from '../order/models';

@Module({
  imports: [SequelizeModule.forFeature([OrderItems, ProductItem, Order])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
