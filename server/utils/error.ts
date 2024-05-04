import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces";

export const errorHandler = (statusCode: number, message: string) => {
  const error: CustomError = new Error();
  error.statusCode = statusCode;
  error.message = message;
  console.log("errrorseasf;jLKJDLFSJFLKJ", error);
  return error;
};

