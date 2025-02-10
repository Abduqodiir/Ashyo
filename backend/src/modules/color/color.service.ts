import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Color } from './models/color.model';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color)
    private colorModel: typeof Color,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    return this.colorModel.create({ ...createColorDto });
  }

  async findAll(): Promise<Color[]> {
    return this.colorModel.findAll();
  }

  async findOne(id: number): Promise<Color> {
    const color = await this.colorModel.findByPk(id);
    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color> {
    const color = await this.findOne(id);
    await color.update(updateColorDto);
    return color;
  }

  async remove(id: number): Promise<void> {
    const color = await this.findOne(id);
    await color.destroy();
  }
}