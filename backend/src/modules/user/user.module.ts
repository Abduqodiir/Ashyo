import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models";
import { UserService } from "./user.service";
import { FileService } from "../file";
import { UserController } from "./user.controller";
import { Address } from "../address";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";
import { Region } from "../region";


@Module({
    imports: [SequelizeModule.forFeature([User, Address,Region])],
    providers: [UserService, FileService,MeService],
    controllers: [UserController,MeController]
})

export class UserModule { }