import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/modules/order/models';
import { Product } from 'src/modules/product';
import { ProductItem } from 'src/modules/product_item';

@Table({ tableName: 'order_items', timestamps: true })
export class OrderItems extends Model {
  @ForeignKey(() => Order)
  @Column({ type: DataType.BIGINT, allowNull: false })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => ProductItem)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_item_id: number;

  @BelongsTo(() => ProductItem)
  product_item: ProductItem

  @Column({ type: DataType.BIGINT, allowNull: false })
  quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  price: number;
}
