import { Injectable } from '@nestjs/common';
import { Brand } from './models';
import { FileService } from '../file';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandRequest, UpdateBrandRequest } from './interfaces';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private brandModel: typeof Brand,
    private fileService: FileService,
  ) {}

  async createBrand(
    payload: CreateBrandRequest,
    file: Express.Multer.File,
  ): Promise<{ message: string; newBrand: Brand }> {
    const image = await this.fileService.uploadFile(file);
    console.log(image);

    const newBrand = await this.brandModel.create({
      name: payload.name,
      image,
    });

    return {
      message: 'Brand created Successfully',
      newBrand,
    };
  }

  async getAllBrands(): Promise<Brand[]> {
    return await this.brandModel.findAll();
  }

  async getSingleBrand(id: number): Promise<Brand> {
    return await this.brandModel.findOne({
      where: { id },
    });
  }

  async updateBrand(
    id: number,
    payload: UpdateBrandRequest,
    file?: Express.Multer.File,
  ): Promise<{ message: string; updatedBrand: Brand }> {
    let newImage: string | undefined;

    if (file) {
      newImage = await this.fileService.uploadFile(file);
      const brand = await this.brandModel.findOne({ where: { id } });
      if (brand?.image) {
        await this.fileService.deleteFile(brand.image);
      }
      payload.image = newImage;
    }
    await this.brandModel.update(payload, {
      where: { id },
    });
    const updatedBrand = await this.brandModel.findOne({ where: { id } });
    return {
      message: 'Brand updated successfully',
      updatedBrand,
    };
  }

  async deleteBrand(id: number): Promise<{ message: string }> {
    const foundedBrand = await this.brandModel.findByPk(id);
    await this.fileService.deleteFile(foundedBrand.image);
    foundedBrand.destroy();
    return {
      message: 'Brand deleted Successfully',
    };
  }
}
