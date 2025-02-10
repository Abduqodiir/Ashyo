import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'contacts', timestamps: false })
export class Contact extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    message: string;
}
