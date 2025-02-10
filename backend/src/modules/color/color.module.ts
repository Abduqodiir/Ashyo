import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { Color } from './models/color.model';

@Module({
    imports: [SequelizeModule.forFeature([Color])],
    controllers: [ColorController],
    providers: [ColorService],
    // exports: [ColorService],
})
export class ColorModule {}
