import {getAuthorRepo} from "../repository/AuthorRepo";
import {IAuthor} from "../model/Author";
import {ObjectID} from "bson";

export class AuthorService {

    private repo = getAuthorRepo();

    async authorNameExists(name: string): Promise<boolean> {
        return this.repo.existsByName(name);
    }

    async addAuthor(author: IAuthor): Promise<IAuthor> {
        return this.repo.insertOne(author);
    }

    async getAuthor(id: ObjectID): Promise<IAuthor> {
        return this.repo.findOneById(id);
    }
}

export const getAuthorService = (): AuthorService => new AuthorService();