import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';
import {request} from "http";
import {IUser, UserCreationRequest} from "../model/User";

@Route('Users')
export class UsersController extends Controller {
    @Get('{id}')
    public async getUser(id: number, @Query() name: string): Promise<IUser> {
        return {
            id: 2,
            email: 'sad',
            name: 'adsjfh',
            phoneNumbers: ['asd45']
        };
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createUser(@Body() requestBody: UserCreationRequest): Promise<void> {
        this.setStatus(201); // set return status 201
        return Promise.resolve();
    }
}