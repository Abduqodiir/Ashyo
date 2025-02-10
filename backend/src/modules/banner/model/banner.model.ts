// src/banner/banner.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/modules/category';
import { Product } from 'src/modules/product';


@Table({ tableName: 'banner', timestamps: true })
export class Banner extends Model {
  @ForeignKey(() => Product)  // Foreign key for the product
  @Column({ type: DataType.INTEGER, allowNull: true })
  product_id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: true })
  category_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Category)
  category: Category;
}
