import {RequestHandler} from "express";
import * as express from 'express';

export class ApiError extends Error {
    public code: number;
    public message: string;
    constructor(code: number, message?: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
}

export const BadRequest = (message?: string): ApiError => new ApiError(400, message || 'Bad Request');

export function apiErrorHandler(err: Error,
                                req: express.Request,
                                res: express.Response,
                                next: express.NextFunction) {
    if (err instanceof ApiError) {
        res.status(err.code);
        res.json({message: err.message});
    }
}