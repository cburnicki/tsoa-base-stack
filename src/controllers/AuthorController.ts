import {authorToDto, IAuthor, IAuthorDto, dtoToAuthor} from "../model/Author";
import {Body, Controller, Get, Post, Route, SuccessResponse} from "tsoa";
import {getAuthorService} from "../service/AuthorService";
import {ApiError, BadRequest, Conflict} from "../utils/errorHandling";
const ObjectId = require('mongodb').ObjectId;

@Route('authors')
export class AuthorsController extends Controller {

    @Get()
    public async getAuthors(): Promise<IAuthorDto[]> {
        const authors = await getAuthorService().getAllAuthors();
        return authors.map(a => authorToDto(a));
    }

    @Get('{id}')
    public async getAuthor(id: number): Promise<IAuthorDto> {
        return authorToDto(await getAuthorService().getAuthor(new ObjectId(id)));
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public async createAuthor(@Body() body: IAuthorDto): Promise<IAuthorDto> {
        console.log(body);
        const service = getAuthorService();
        if (await service.authorNameExists(body.name)) {
            throw Conflict('Author name already exists.')
        }
        const added = await service.addAuthor(dtoToAuthor(body));
        this.setStatus(201);
        return authorToDto(added);
    }
}