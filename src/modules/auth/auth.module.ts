import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    
  imports: [
    SequelizeModule.forFeature([User]),
    
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,  
          secure: false, 
          auth: {
            user: `kamronbekbahriyev18@gmail.com`,
            pass:  `whudllcxkbgnpgmu`,
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.SENDING_EMAIL}>`,
        },
      })
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
