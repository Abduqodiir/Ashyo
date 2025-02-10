import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './models';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user';
import { Address } from '../address';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
