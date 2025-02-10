import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VariationOption } from './models';
import { VariationOptionController } from './variation_option.controller';
import { VariationOptionService } from './variation_option.service';

@Module({
    imports: [SequelizeModule.forFeature([VariationOption])],
    controllers: [VariationOptionController],
    providers: [VariationOptionService],
})
export class VariationOptionModule {}
