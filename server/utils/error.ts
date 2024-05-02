import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces";

// export function errorHandler1(err: Error, req: Request, res: Response, next: NextFunction) {
//     console.error(err.stack);
//     res.status(500).json({ error: err });
// }

export const errorHandler = (statusCode: number, message: string) => {
    const error: CustomError = new Error();
    error.statusCode = statusCode;
    error.message = message;
    console.log("errrorseasf;jLKJDLFSJFLKJ",error);
    return error;
  };
  
