import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models';
import { CreateRegionDto, UpdateRegionDto } from './dto';
import { regionSeedData } from './region.seeds';
import sequelize, { literal, where } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class RegionService implements OnModuleInit {
  constructor(
    @InjectModel(Region)
    private readonly regionModel: typeof Region,
  ) {}

  async onModuleInit(): Promise<void> {
    // console.log('Initializing MyModule...');

    // Jadvaldagi rowlar sonini tekshirish
    const count = await this.regionModel.count();

    if (count === 0) {
      // console.log('Table is empty. Seeding data...');
      // Seed ma'lumotlarni qo'shish
      await this.regionModel.bulkCreate(regionSeedData);

      console.log('Seeding complete.');
    } else {
      console.log('Table already contains data. Skipping seed.');
    }
  }

  // Region yaratish
  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionModel.create({ ...createRegionDto });
  }

  // // Shahar yaratish
  // async createCity(name: string, region_id: number): Promise<Region> {
  //   return this.regionModel.create({ name, type: 'CITY', region_id });
  // }

  // // Tuman yaratish
  // async createDistrict(name: string, region_id: number): Promise<Region> {
  //   return this.regionModel.create({ name, type: 'DISTRICT', region_id });
  // }

  // Regionni ID bo'yicha olish
  async getRegionById(id: number): Promise<Region> {
    return this.regionModel.findByPk(id, {
      include: [
        { model: Region, as: 'parent' },
        { model: Region, as: 'children' },
      ],
    });
  }

  // Regionlarni olish (masalan, barcha regionlar)
  async getAllRegions(): Promise<Region[]> {
    return this.regionModel.findAll({
      include: [
        { model: Region, as: 'parent' },
        { model: Region, as: 'children' },
      ],
    });
  }

  // Parent Regionlarni olish (masalan, Toshkent viloyati yoki Toshkent shahri)
  async getParentRegions(): Promise<Region[]> {
    return this.regionModel.findAll({
      where: {
        region_id: null
      },
      order: [['id', 'ASC']]});
  }

  // Regionni o'zgartirish
  async updateRegion(
    id: number,
    UpdateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const region = await this.regionModel.findByPk(id);
    if (!region) {
      throw new Error('Region not found');
    }
    if (UpdateRegionDto.region_id) console.log(null);
    await this.regionModel.update(
      {
        region_id: UpdateRegionDto.region_id
          ? UpdateRegionDto.region_id
          : UpdateRegionDto.region_id === null
            ? null
            : region.region_id,
        type: UpdateRegionDto.type ? UpdateRegionDto.type : region.type,
        name: UpdateRegionDto.name ? UpdateRegionDto.name : region.name,
      },
      { where: { id } },
    );
    return this.getRegionById(id);
  }

  // Regionni o'chirish
  async deleteRegion(id: number): Promise<void> {
    const region = await this.regionModel.findByPk(id);
    if (region) {
      await region.destroy();
    } else {
      throw new Error('Region not found');
    }
  }
}
