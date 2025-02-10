import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { FileService } from '../file';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  providers: [BrandService,FileService],
  controllers: [BrandController],
})
export class BrandModule {}
