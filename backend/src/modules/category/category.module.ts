import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models';
import { FileService } from '../file';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [CategoryService, FileService],
  controllers: [CategoryController],
})
export class CategoryModule {}
