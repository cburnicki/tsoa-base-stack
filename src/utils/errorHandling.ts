import {RequestHandler} from "express";
import * as express from 'express';
import {ValidateError} from "tsoa";

export class ApiError extends Error {
    public code: number;
    public message: string;
    constructor(code: number, message?: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
}

export const BadRequest = (message?: string): ApiError => new ApiError(400, message || 'Bad request');
export const Conflict = (message?: string): ApiError => new ApiError(409, message || 'Conflict');
export const NotFound = (message?: string): ApiError => new ApiError(404, message || 'Not found');

export function apiErrorHandler(err: Error,
                                req: express.Request,
                                res: express.Response,
                                next: express.NextFunction) {
    console.log('ERROR', err);
    if (err instanceof ApiError) {
        res.status(err.code);
        res.json({message: err.message});
    }
    if (err instanceof ValidateError) {
        res.status(err.status);
        res.json({message: err.message, fields: err.fields});
    }
}