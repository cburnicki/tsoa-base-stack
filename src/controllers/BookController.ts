import {IAuthor, IAuthorDto, dtoToAuthor} from "../model/Author";
import {Body, Controller, Get, Post, Route, SuccessResponse} from "tsoa";
import {getAuthorService} from "../service/AuthorService";
import {ApiError, BadRequest, Conflict, NotFound} from "../utils/errorHandling";
import {bookToDto, dtoToBook, IBook, IBookDto} from "../model/Book";
import {getBookService} from "../service/BookService";
const ObjectId = require('mongodb').ObjectId;

@Route('books')
export class BookController extends Controller {

    @Get()
    public async getBooks(): Promise<IBookDto[]> {
        const books = await getBookService().getAllBooks();
        return books.map(b => bookToDto(b));
    }

    @Get('{id}')
    public async getBook(id: number): Promise<IBookDto> {
        return bookToDto(await getBookService().getBookById(new ObjectId(id)));
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public async createBook(@Body() body: IBookDto): Promise<IBookDto> {
        if (!await getAuthorService().authorExists(new ObjectId(body.authorId))) {
            throw NotFound('Author not found');
        }
        const added = await getBookService().addBook(dtoToBook(body));
        this.setStatus(201);
        return bookToDto(added);
    }
}