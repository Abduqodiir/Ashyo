import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductItem } from './models';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';
import { FileService } from '../file';

@Module({
  imports: [SequelizeModule.forFeature([ProductItem])],
  controllers: [ProductItemController],
  providers: [ProductItemService,FileService],
  exports: [ProductItemService],
})
export class ProductItemModule {}
