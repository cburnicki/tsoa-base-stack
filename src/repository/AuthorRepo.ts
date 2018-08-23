import {BaseRepo} from "./BaseRepository";
import {IAuthor} from "../model/Author";

export class AuthorRepo extends BaseRepo<IAuthor> {

    constructor() { super('authors'); }

    public async existsByName(name: string): Promise<boolean> {
        return this.exists({name: name});
    }
}

export const getAuthorRepo = (): AuthorRepo => new AuthorRepo();