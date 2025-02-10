import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';

@Module({
  imports: [SequelizeModule.forFeature([Region])],
  providers: [RegionService],
  controllers: [RegionController],
})
export class RegionModule {}

