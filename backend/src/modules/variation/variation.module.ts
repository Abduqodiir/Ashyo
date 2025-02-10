import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Variation } from './models';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';

@Module({
  imports: [SequelizeModule.forFeature([Variation])],
  controllers: [VariationController],
  providers: [VariationService],
  exports: [VariationService],
})
export class VariationModule {}
