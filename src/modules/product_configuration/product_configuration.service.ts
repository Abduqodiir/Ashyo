import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductConfigurationDto } from './dto';
import {UpdateProductConfigurationDto} from './dto'
import { ProductConfiguration } from './models';
import { ProductItem } from '../product_item';
import { Product } from '../product/models';
import { VariationOption } from '../variation_option';

@Injectable()
export class ProductConfigurationService {
    constructor(
        @InjectModel(ProductConfiguration)
        private readonly productConfigurationModel: typeof ProductConfiguration,
    ) {}

    async create(dto: CreateProductConfigurationDto): Promise<ProductConfiguration> {
        return this.productConfigurationModel.create(dto as any);
    }

    async findAll(): Promise<ProductConfiguration[]> {
      return this.productConfigurationModel.findAll({
        include: [
          { model: ProductItem},
          { model: VariationOption },
        ]
      });
  }
  

    async findOne(id: number): Promise<ProductConfiguration> {
        const productConfiguration = await this.productConfigurationModel.findByPk(id, { include: { all: true } });
        if (!productConfiguration) {
            throw new NotFoundException(`ProductConfiguration with ID ${id} not found.`);
        }
        return productConfiguration;
    }

    async update(id: number, dto: UpdateProductConfigurationDto): Promise<ProductConfiguration> {
        const productConfiguration = await this.findOne(id);
        return productConfiguration.update(dto);
    }

    async remove(id: number): Promise<void> {
        const productConfiguration = await this.findOne(id);
        await productConfiguration.destroy();
    }
}
