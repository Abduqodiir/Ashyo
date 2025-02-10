import { UserRoles } from "../enums";

export declare interface CreateUserRequest {
    fullname: string;
    email: string;
    phone_number?: string;
    password: string;
    image?: string;
    role?: UserRoles;
    is_verified ?: boolean
}