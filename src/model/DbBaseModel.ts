import {ObjectID} from "bson";

export interface IDbBaseModel {
    _id?: ObjectID;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
}