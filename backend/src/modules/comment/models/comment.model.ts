import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user";
import { Product } from "src/modules/product";

@Table({ tableName: "comment", timestamps: true })
export class Comment extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    text: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    user_id: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    product_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Product)
    product: Product;
}
