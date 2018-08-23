import {BaseRepo} from "./BaseRepository";
import {IBook} from "../model/Book";
import {ObjectID} from "bson";

export class BookRepo extends BaseRepo<IBook> {

    constructor() { super('books'); }

    async findByAuthorId(authorId: ObjectID): Promise<IBook[]> {
        return this.c.find<IBook>({authorId: authorId}).toArray();
    }
}

export const getBookRepo = (): BookRepo => new BookRepo();