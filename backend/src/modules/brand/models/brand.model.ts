import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'brands', timestamps: true })
export class Brand extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false, unique: true })
    name: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    image: string
}
