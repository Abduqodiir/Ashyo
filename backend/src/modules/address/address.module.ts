import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './models';
import { Region } from '../region';

@Module({
  imports: [SequelizeModule.forFeature([Address, Region])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
