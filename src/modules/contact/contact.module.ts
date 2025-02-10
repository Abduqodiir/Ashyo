import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './models';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
    imports: [SequelizeModule.forFeature([Contact]), TelegramModule],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule { }
