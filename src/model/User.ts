import {IDbBaseModel} from "./DbBaseModel";

export interface IUser extends IDbBaseModel {
    email: string;
    name: string;
    status?: status;
    phoneNumbers: string[];
}

export type status = 'Happy' | 'Sad';


export interface UserCreationRequest {
    email: string;
    name: string;
    phoneNumbers: string[];
}