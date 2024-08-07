import { EOtpReceive } from "../enums";
import { IBaseUser } from "./IUser";

export type TReceiveOtpRequest = {
    receiver: string;
    type: EOtpReceive;  
}

export type TReceiveOtpResponse = {
    otp: number;
}

export type TVerifyOtpRequest = {
    receiver: string;
    type: EOtpReceive;  
    otp: string;
}

export type TVerifyOtpResponse = {
    jwt: string;
    user: IBaseUser;
}