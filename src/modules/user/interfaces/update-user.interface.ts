import { UserRoles } from "../enums";

export declare interface UpdateUserRequest {
    fullname?: string;
    email?: string;
    phone_number?: string;
    password?: string;
    image?: string;
    role?: UserRoles;
    is_verified?: boolean
}