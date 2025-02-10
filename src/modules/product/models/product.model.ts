import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Banner } from 'src/modules/banner/model';
import { Brand } from 'src/modules/brand';
import { Category } from 'src/modules/category';
import { Comment } from 'src/modules/comment';
import { Like } from 'src/modules/like';
import { ProductItem } from 'src/modules/product_item';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_liked: boolean;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  category_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({
    type: DataType.ENUM('3 oy', '6 oy', '12 oy'),
    allowNull: false,
  })
  nasiya: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  summary: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  is_aksiya: boolean;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.BIGINT, allowNull: false,})
  brand_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Brand)
  brand: Brand;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Like)
  like: Like[];


  @HasMany(() => ProductItem)
  product_item: ProductItem[]

  @HasMany(() => Banner)  
  banners: Banner[];

}