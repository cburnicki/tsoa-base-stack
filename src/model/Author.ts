import {IDbBaseModel} from "./DbBaseModel";

export interface IAuthor extends IDbBaseModel {
    name: string;
}

export interface IAuthorDto {
    id?: string;
    name: string;
}

export function authorToDto(author: IAuthor): IAuthorDto {
    return {
        id: author._id.toHexString(),
        name: author.name,
    };
}

export function newAuthor(dto: IAuthorDto): IAuthor {
    return {name: dto.name};
}