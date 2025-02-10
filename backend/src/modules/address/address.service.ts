import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './models';
import { Region } from '../region';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { addressSeedData } from './address.seeds';

@Injectable()
export class AddressService implements OnModuleInit {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
    @InjectModel(Region)
    private readonly regionModel: typeof Region,
  ) {}

  async onModuleInit(): Promise<void> {
      // console.log('Initializing MyModule...');
  
      // Jadvaldagi rowlar sonini tekshirish
      const count = await this.addressModel.count();
  
      if (count === 0) {
        // console.log('Table is empty. Seeding data...');
        // Seed ma'lumotlarni qo'shish
        await this.addressModel.bulkCreate(addressSeedData);
        console.log('Seeding complete.');
      } else {
        console.log('Table already contains data. Skipping seed.');
      }
    }

  async create(createAddressDto: CreateAddressDto) {
    const { region_id, city_id, district_id } = createAddressDto;

    if (region_id === null && district_id) {
      // Toshkent shahar uchun tekshiruv
      const district = await this.regionModel.findOne({
        where: { 
          id: district_id, 
          type: 'DISTRICT',
          region_id: null 
        }
      });
      
      if (!district) {
        throw new Error('Invalid district for Tashkent city');
      }
    } else if (region_id && district_id) {
      // Viloyatlar uchun tekshiruv
      if (city_id) {
        const city = await this.regionModel.findOne({
          where: { 
            id: city_id, 
            type: 'CITY',
            region_id: region_id 
          }
        });
        
        if (!city) {
          throw new Error('Invalid city for selected region');
        }

        const district = await this.regionModel.findOne({
          where: { 
            id: district_id, 
            type: 'DISTRICT',
            region_id: city_id 
          }
        });
        
        if (!district) {
          throw new Error('Invalid district for selected city');
        }
      } else {
        const district = await this.regionModel.findOne({
          where: { 
            id: district_id, 
            type: 'DISTRICT',
            region_id: region_id 
          }
        });
        
        if (!district) {
          throw new Error('Invalid district for selected region');
        }
      }
    }

    return this.addressModel.create({
      user_id: createAddressDto.user_id,
      region_id: createAddressDto.region_id,
      city_id: createAddressDto.city_id || null,
      district_id: createAddressDto.district_id || null,
      street: createAddressDto.street,
    });
    
  }

  async findAll() {
    return this.addressModel.findAll({
      include: [
        {
          model: Region,
          as: 'region',
          attributes: ['id', 'region_id', 'name', 'type']
        },
        {
          model: Region,
          as: 'city',
          attributes: ['id', 'region_id', 'name', 'type']
        },
        {
          model: Region,
          as: 'district',
          attributes: ['id', 'region_id', 'name', 'type']
        }
      ]
    });
  }

  async findOne(id: number) {
    return this.addressModel.findOne({
      where: { id },
      include: [
        {
          model: Region,
          as: 'region',
          attributes: ['id', 'region_id', 'name', 'type']
        },
        {
          model: Region,
          as: 'city',
          attributes: ['id', 'region_id', 'name', 'type']
        },
        {
          model: Region,
          as: 'district',
          attributes: ['id', 'region_id', 'name', 'type']
        }
      ]
    });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      throw new Error('Address not found');
    }

    const { region_id, city_id, district_id } = updateAddressDto;

    if (region_id === null && district_id) {
      // Toshkent shahar uchun tekshiruv
      const district = await this.regionModel.findOne({
        where: { 
          id: district_id, 
          type: 'DISTRICT',
          region_id: null 
        }
      });
      
      if (!district) {
        throw new Error('Invalid district for Tashkent city');
      }
    } else if (region_id && district_id) {
      // Viloyatlar uchun tekshiruv
      if (city_id) {
        const city = await this.regionModel.findOne({
          where: { 
            id: city_id, 
            type: 'CITY',
            region_id: region_id 
          }
        });
        
        if (!city) {
          throw new Error('Invalid city for selected region');
        }

        const district = await this.regionModel.findOne({
          where: { 
            id: district_id, 
            type: 'DISTRICT',
            region_id: city_id 
          }
        });
        
        if (!district) {
          throw new Error('Invalid district for selected city');
        }
      } else {
        const district = await this.regionModel.findOne({
          where: { 
            id: district_id, 
            type: 'DISTRICT',
            region_id: region_id 
          }
        });
        
        if (!district) {
          throw new Error('Invalid district for selected region');
        }
      }
    }

    return address.update(updateAddressDto);
  }

  async remove(id: number) {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      throw new Error('Address not found');
    }
    await address.destroy();
    return { message: 'Address deleted successfully' };
  }
}
