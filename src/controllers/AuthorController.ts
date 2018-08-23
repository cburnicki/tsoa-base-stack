import {IAuthor, IAuthorDto, newAuthor} from "../model/Author";
import {Body, Controller, Get, Post, Route, SuccessResponse} from "tsoa";
import {getAuthorService} from "../service/AuthorService";
const ObjectId = require('mongodb').ObjectId;

@Route('Authors')
export class AuthorsController extends Controller {
    @Get('{id}')
    public async getAuthor(id: number): Promise<IAuthor> {
        return getAuthorService().getAuthor(new ObjectId(id));
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public async createAuthor(@Body() body: IAuthorDto): Promise<IAuthor> {
        const service = getAuthorService();
        if (await service.authorNameExists(body.name)) {
            this.setStatus(409);
            return Promise.resolve();
        }
        const added = await service.addAuthor(newAuthor(body));
        this.setStatus(201);
        return added;
    }
}