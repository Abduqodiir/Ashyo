import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Variation } from './models';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { Attributes } from 'sequelize';
import { Category } from '../category';

@Injectable()
export class VariationService {
  constructor(@InjectModel(Variation) private readonly variationModel: typeof Variation) {}

  async create(createVariationDto: CreateVariationDto): Promise<Variation> {
    return this.variationModel.create(createVariationDto as Attributes<Variation>);
  }

  async findAll(): Promise<Variation[]> {
    return this.variationModel.findAll({ include: [{ model:Category }] });
  }

  async findOne(id: number): Promise<Variation> {
    const variation = await this.variationModel.findByPk(id, { include: [{ all: true }] });
    if (!variation) {
      throw new NotFoundException(`Variation with ID ${id} not found.`);
    }
    return variation;
  }

  async update(id: number, updateVariationDto: UpdateVariationDto): Promise<Variation> {
    const variation = await this.findOne(id);
    return variation.update(updateVariationDto as Attributes<Variation>);
  }

  async delete(id: number): Promise<void> {
    const variation = await this.findOne(id);
    await variation.destroy();
  }
}
