import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { ProductItem } from 'src/modules/product_item';

@Table({ tableName: 'color', timestamps: true })
export class Color extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  color_code: string;

  @HasMany(() => ProductItem)
  product_item: ProductItem[];
}