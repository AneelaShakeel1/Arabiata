import { IResponse } from "./IResponse";
import { IBaseUser } from "./IUser";

export interface IRegisterRequest {
    jwt: string;
    user: IBaseUser;
}

export interface IRegisterResponse extends IResponse <> {
    jwt: string;
    user: IBaseUser;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends IResponse <IBaseUser> {}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IForgotPasswordResponse extends IResponse <> {}