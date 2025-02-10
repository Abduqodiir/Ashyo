import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { User } from '../user/models/user.model';
import { Address } from '../address';
import { Region } from '../region';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderModel.create({ ...createOrderDto });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.findAll({
      include: [
        {
          model: User,
          // attributes: ['id', 'name', 'email'],
        },
        {
          model: Address,
          include: [{ model: Region, as: 'region' }, { model: Region, as: 'city' }, { model: Region, as: 'district' }],
          // attributes: ['id', 'address', 'city', 'country'],
        },
      ],
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          // attributes: ['id', 'name', 'email'],
        },
        {
          model: Address,
          include: [{ model: Region, as: 'region' }, { model: Region, as: 'city' }, { model: Region, as: 'district' }],
          // attributes: ['id', 'address', 'city', 'country'],
        },
      ],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      return null;
    }
    await order.update(updateOrderDto);
    return order;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.orderModel.destroy({
      where: { id },
    });
    return deleted > 0;
  }
}
