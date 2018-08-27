import {getBookRepo} from "../repository/BookRepo";
import {IBook} from "../model/Book";
import {ObjectID} from "bson";
import {getAuthorRepo} from "../repository/AuthorRepo";

export class BookService {

    async getAllBooks(): Promise<IBook[]> {
        return getBookRepo().findAll();
    }

    async getBookById(bookId: ObjectID): Promise<IBook> {
        return getBookRepo().findOneById(bookId);
    }

    async getByAuthorId(authorId: ObjectID): Promise<IBook[]> {
        return getBookRepo().findByAuthorId(authorId);
    }

    async addBook(book: IBook): Promise<IBook> {
        const author = await getAuthorRepo().findOneById(book.authorId);
        book.author = author.name;
        return getBookRepo().insertOne(book);
    }

}

export const getBookService = (): BookService => new BookService();