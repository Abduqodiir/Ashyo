import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductConfiguration } from './models';
import { ProductConfigurationController } from './product_configuration.controller';
import { ProductConfigurationService } from './product_configuration.service';

@Module({
    imports: [SequelizeModule.forFeature([ProductConfiguration])],
    controllers: [ProductConfigurationController],
    providers: [ProductConfigurationService],
})
export class ProductConfigurationModule {}