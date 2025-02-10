// me.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "./models";
import { Address } from "../address";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "../region";
import { Order } from "../order";

@Injectable()
export class MeService {
    async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id, {
            include: [
                {
                    model: Address,
                    as: 'address',
                    include: [
                        {
                            model: Region,
                            as: 'region' 
                        },
                        {
                            model: Region,
                            as: 'city' 
                        },
                        {
                            model: Region,
                            as: 'district'
                        }
                    ]
                },
                {
                    model:Order,
                }
                
            ]
        });
    }

    async updateUser(id: number, updateData: Partial<User>): Promise<User | null> {
        const user = await this.getUserById(id);
        if (!user) return null;
        if (!user.is_verified) throw new Error('User is not verified');

        await user.update(updateData);
        return user;
    }
}
