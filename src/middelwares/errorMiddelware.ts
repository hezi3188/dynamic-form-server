import { Request, Response, NextFunction } from 'express';
import { AppError } from '../classes/AppError';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const errorMiddleware = (err: AppError | ZodError, req: Request, res: Response, next: NextFunction): void => {
    console.log(err);

    if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((error) => ({
            path: error.path.join('.'),
            message: error.message,
        }));
        res.status(StatusCodes.NOT_FOUND).json({
            status: 'error',
            message: formattedErrors,
        });
    } else {
        res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: err.message || 'Internal Server Error',
        });
    }
};
