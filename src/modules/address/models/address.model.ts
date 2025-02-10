import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/modules/order';
import { Region } from 'src/modules/region';
import { User } from 'src/modules/user';

@Table({ tableName: 'address', timestamps: true })
export class Address extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, { foreignKey: 'user_id' })
  user: User;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  region_id: number;

  @BelongsTo(() => Region, { foreignKey: 'region_id' })
  region: Region;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: true })
  city_id?: number | null;

  @BelongsTo(() => Region, { foreignKey: 'city_id' })
  city: Region;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: true })
  district_id?: number | null;

  @BelongsTo(() => Region, { foreignKey: 'district_id' })
  district?: Region;

  @Column({ type: DataType.STRING, allowNull: false })
  street: string;

  @HasMany(() => Order)
  order: Order[];
}
