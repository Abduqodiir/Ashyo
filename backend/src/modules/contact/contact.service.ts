import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './models';
import { CreateContactDto } from './dtos';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact) private contactModel: typeof Contact,
        private telegramService: TelegramService,
    ) { }

    async createContact(dto: CreateContactDto): Promise<Contact> {
        const contact = await this.contactModel.create(
            { name: dto.name, email: dto.email, message: dto.message },
        );

        const message = `New Contact Us Message:
- Name: ${dto.name}
- Email: ${dto.email}
- Message: ${dto.message}`;
        await this.telegramService.sendMessage(message);

        return contact;
    }
}
