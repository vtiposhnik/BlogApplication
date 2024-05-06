import { NextFunction, Request, Response } from "express"
import User from "../models/user.model"

export const getApi = (req: Request, res: Response) => {
    res.send('ladidabudubadabi')
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body

    const user = await User.findById('66377e4a55f7b37c918cbd4a')

    console.log(user);
    res.status(201).json({ message: 'user retrieved', success: true, user: user })
}

export const signout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token').status(200).json('User signed out successfully')
    } catch (error) {
        next(error)
    }
}