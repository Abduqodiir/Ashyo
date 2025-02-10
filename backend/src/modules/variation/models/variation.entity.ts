import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from 'src/modules/category';
import { VariationOption } from 'src/modules/variation_option';

@Table({ tableName: 'variation', timestamps: true })
export class Variation extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT, allowNull: false })
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => VariationOption)
    options: VariationOption[];
}