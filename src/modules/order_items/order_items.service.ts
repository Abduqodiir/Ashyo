import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItems } from './models';
import { Order } from '../order/models';
import { ProductItem } from '../product_item';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItems)
    private orderItemsRepository: typeof OrderItems,
    @InjectModel(Order)
    private orderRepository: typeof Order,
    @InjectModel(ProductItem)
    private productItemRepository: typeof ProductItem,
  ) { }

  async create(createOrderItemDto: {
    order_id: number;
    product_item_id: number;
    quantity: number;
  }) {
    const productItem = await this.productItemRepository.findByPk(
      createOrderItemDto.product_item_id,
    );

    if (!productItem) {
      throw new Error('ProductItem not found');
    }

    const orderItem = await this.orderItemsRepository.create({
      ...createOrderItemDto,
      price: productItem.price,
    });

    const allOrderItems = await this.orderItemsRepository.findAll({
      where: { order_id: createOrderItemDto.order_id },
    });

    const totalPrice = allOrderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    await this.orderRepository.update(
      { total_price: totalPrice },
      { where: { id: createOrderItemDto.order_id } },
    );

    return orderItem;
  }

  async findAll() {
    return this.orderItemsRepository.findAll({
      include: [ProductItem, Order],
    });
  }

  async findOne(id: number) {
    return this.orderItemsRepository.findOne({
      where: { id },
      include: [ProductItem, Order],
    });
  }
}