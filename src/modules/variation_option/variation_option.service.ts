import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVariationOptionDto} from './dto';
import {UpdateVariationOptionDto } from './dto'
import { VariationOption } from './models';
import { Variation } from '../variation/models';

@Injectable()
export class VariationOptionService {
    constructor(
        @InjectModel(VariationOption)
        private readonly variationOptionModel: typeof VariationOption,
    ) {}

    async create(dto: CreateVariationOptionDto): Promise<VariationOption> {
        return this.variationOptionModel.create(dto as any);
    }

    async findAll(): Promise<VariationOption[]> {
        return this.variationOptionModel.findAll({ include: [{ model:Variation }] });
    }

    async findOne(id: number): Promise<VariationOption> {
        const variationOption = await this.variationOptionModel.findByPk(id, { include: { all: true } });
        if (!variationOption) {
            throw new NotFoundException(`VariationOption with ID ${id} not found.`);
        }
        return variationOption;
    }

    async update(id: number, dto: UpdateVariationOptionDto): Promise<VariationOption> {
        const variationOption = await this.findOne(id);
        return variationOption.update(dto);
    }

    async remove(id: number): Promise<void> {
        const variationOption = await this.findOne(id);
        await variationOption.destroy();
    }
}
