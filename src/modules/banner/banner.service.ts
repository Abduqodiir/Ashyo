import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Banner } from './model';
import { CreateBannerDto, UpdateBannerDto } from './dto';
import { Product } from '../product';
import { Category } from '../category';
import { FileService } from '../file';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner)
    private readonly bannerModel: typeof Banner,
    private fileService: FileService,
  ) {}

  async create(createBannerDto: CreateBannerDto, file: Express.Multer.File): Promise<Banner> {
    const image = await this.fileService.uploadFile(file)

    const banner = await this.bannerModel.create({
      product_id: createBannerDto.product_id,
      category_id: createBannerDto.category_id,
      title: createBannerDto.title,
      description: createBannerDto.description,
      image: image,
      name: createBannerDto.name,
    });
    return banner;
  }

  async findAll(): Promise<Banner[]> {
    return this.bannerModel.findAll({
      include: [
                { model: Product},
                { model: Category},
              ]
    });
  }

  // Get a banner by id
  async findOne(id: number): Promise<Banner> {
    return this.bannerModel.findByPk(id,{
      include: [
        { model: Product},
        { model: Category},
      ]
    });
  }

  // Update a banner by id
  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const banner = await this.findOne(id);
    if (!banner) {
      throw new Error('Banner not found');
    }
    await banner.update(updateBannerDto);
    return banner;
  }

  // Delete a banner by id
  async remove(id: number): Promise<void> {
    const banner = await this.findOne(id);
    if (!banner) {
      throw new Error('Banner not found');
    }
    await banner.destroy();
  }
}
