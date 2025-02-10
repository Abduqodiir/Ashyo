import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ProductItem } from "src/modules/product_item";
import { VariationOption } from "src/modules/variation_option";


@Table({ tableName: 'product_configuration', timestamps: true })
export class ProductConfiguration extends Model {
    @ForeignKey(() => ProductItem)
    @Column({ type: DataType.BIGINT, allowNull: false })
    product_item_id: number;

    @BelongsTo(() => ProductItem)
    productItem: ProductItem;

    @ForeignKey(() => VariationOption)
    @Column({ type: DataType.BIGINT, allowNull: false })
    variation_option_id: number;

    @BelongsTo(() => VariationOption)
    variationOption: VariationOption;

}
