import { NextFunction, Request, Response } from "express"

export const getApi = (req: Request, res: Response) => {
    res.send('ladidabudubadabi')
}
export const signout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token').status(200).json('User signed out successfully')
    } catch (error) {
        next(error)
    }
}