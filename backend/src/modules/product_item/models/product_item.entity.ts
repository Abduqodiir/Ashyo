import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductConfiguration } from 'src/modules/product_configuration';
import { Product } from 'src/modules/product/models/product.model';
import { Color } from 'src/modules/color';

@Table({ tableName: 'product_item', timestamps: true })
export class ProductItem extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @HasMany(() => ProductConfiguration)
  configurations: ProductConfiguration[];

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Color)
  @Column({ type: DataType.BIGINT, allowNull: false })
  color_id: number;

  @BelongsTo(() => Color)
  color: Color;
}
