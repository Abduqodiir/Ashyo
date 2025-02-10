import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/modules/product';
import { User } from 'src/modules/user'; // User modelini import qiling

@Table({ tableName: 'cart', timestamps: true })
export class Cart extends Model {
  // @ForeignKey(() => User) // User modeliga foreign key
  // @Column({ type: DataType.BIGINT, allowNull: false })
  // user_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;


  @BelongsTo(() => Product)
  product: Product;

  // @BelongsTo(() => User) 
  // user: User;
}
