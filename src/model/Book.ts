import {IDbBaseModel} from "./DbBaseModel";
import {ObjectID} from "bson";

export interface IBook extends IDbBaseModel {
    title: string;
    description?: string;
    dateOfPublication: Date;
    authorId: ObjectID;
    author: string;
}

export interface IBookDto {
    id?: string;
    title: string;
    description?: string;
    dateOfPublication: string;
    authorId: string;
    author: string;
}

export function bookToDto(book: IBook): IBookDto {
    return {
        id: book._id.toHexString(),
        title: book.title,
        description: book.description,
        dateOfPublication: book.dateOfPublication.toISOString(),
        authorId: book.authorId.toHexString(),
        author: book.author
    };
}