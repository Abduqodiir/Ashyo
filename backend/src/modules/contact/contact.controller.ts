import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos';
import { Contact } from './models';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Contact Us')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Protected(false)
    @Roles([UserRoles.admin, UserRoles.user])
    @ApiOperation({ summary: 'Send a new contact message' })
    @Post()
    async createContact(@Body() dto: CreateContactDto): Promise<Contact> {
        return await this.contactService.createContact(dto);
    }
}
