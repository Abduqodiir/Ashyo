import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user';
import { Product } from 'src/modules/product';

@Table({ tableName: 'cart_item', timestamps: true })
export class CartItem extends Model {
  
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  product_id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
