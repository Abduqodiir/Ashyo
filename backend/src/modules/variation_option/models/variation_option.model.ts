import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ProductConfiguration } from "src/modules/product_configuration";
import { Variation } from "src/modules/variation";

@Table({ tableName: 'variation_option', timestamps: true })
export class VariationOption extends Model {
    @ForeignKey(() => Variation)
    @Column({ type: DataType.BIGINT, allowNull: false })
    variation_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    value: string;

    @HasMany(() => ProductConfiguration)
    configurations: ProductConfiguration[];

    @BelongsTo(() => Variation)
    variation: Variation;
}
