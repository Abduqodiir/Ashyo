import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Address } from 'src/modules/address';
import { User } from 'src/modules/user/models/user.model';
import { OrderStatus } from '../enums';

@Table({ tableName: 'order', timestamps: true })
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Address)
  @Column({ type: DataType.BIGINT, allowNull: false })
  address_id: number;

  @BelongsTo(() => Address)
  address: Address;

  @Column({
    type: DataType.ENUM,
    values: [OrderStatus.delivered, OrderStatus.denied, OrderStatus.processing],
    allowNull: false,
  })
  status: OrderStatus;

  @Column({
    type: DataType.DECIMAL(10, 2), allowNull: false
  })
  total_price: number | null
}
