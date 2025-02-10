import { 
    Table, 
    Model, 
    Column, 
    DataType, 
    HasMany, 
    Unique, 
    AfterCreate 
  } from 'sequelize-typescript';
  import { Address } from 'src/modules/address';
  import { Comment } from 'src/modules/comment';
  import { Like } from 'src/modules/like';
  import { UserRoles } from '../enums';
  import { Region } from 'src/modules/region';
  import { Order } from 'src/modules/order';
  import { CartItem } from 'src/modules/cart_item';
  import { Cart } from 'src/modules/cart/models';
  
  @Table({ tableName: 'users', timestamps: true })
  export class User extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    fullname: string;
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;
  
    @Column({ type: DataType.BIGINT, allowNull: true })
    phone_number?: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    image?: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
  
    @Column({
      type: DataType.ENUM,
      values: [UserRoles.admin, UserRoles.user],
      allowNull: false,
      defaultValue: UserRoles.user,
    })
    role?: UserRoles;
  
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    is_verified: boolean;
  
    @HasMany(() => Address)
    address: Address[];
  
    @HasMany(() => Like)
    like: Like[];
  
    @HasMany(() => Comment)
    comment: Comment[];
  
    @HasMany(() => Order)
    order: Order[];
  
    @HasMany(() => CartItem)
  cartItems: CartItem[];
  }
  