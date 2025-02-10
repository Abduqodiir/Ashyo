import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TelegramService {
    private readonly botToken = '7760329373:AAFn5tZwSaeiDLbwTeSvOz2Z0BEWRTz8oXw';
    private readonly adminChatId = '5089885684'; 

    constructor(private readonly httpService: HttpService) { }

    async sendMessage(message: string): Promise<void> {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        await this.httpService.post(url, {
            chat_id: this.adminChatId,
            text: message,
        }).toPromise();
    }
}
