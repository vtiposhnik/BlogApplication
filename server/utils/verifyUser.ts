import jwt, { Secret } from 'jsonwebtoken';
import { errorHandler } from './error';
import { NextFunction, Request, Response } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const secret_key: Secret | undefined = process.env.SECRET_KEY_JWT
    const token = req.cookies.access_token

    if (!secret_key) {
        return next(errorHandler(500, 'Internal Server Error'));
    }
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, secret_key, (err: any, user: any) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized'));
        }

        req.body.user = user;
        next();
    });
};
