import { TAddress } from "../types";

export type TUser = 'client' | 'contractor' | 'team';
export interface IBaseUser {
    id: number;
    name: string;
    mobile: string;
    email: string;
    login_type: string;
    referral_code: string;
    profile_image: string;
}

export interface IPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number
}

// export interface IMeta {
//     pagination: IPagination
// }