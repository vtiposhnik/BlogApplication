import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from 'bcryptjs'

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ username: username })

        if (!email || !password || email === '' || password === '' || !username || username === '') {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (username === user?.username) {
            return res.status(400).json({ message: 'Username is already in use!'})
        }
        if (email === user?.email) {
            return res.status(400).json({ message: 'Email is already in use!'})
        }
        const hashedPwd = bcryptjs.hashSync(password, 6)

        const newUser = new User({
            username,
            email,
            password: hashedPwd
        })
        newUser.save()

        res.status(200).json({ message: "Registration completed successfully!", success: true, username: user?.username })
        console.log('REQUEST BODY(SIGNUP):', req.body);
    }
    catch (error) {
        console.error(error);
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (!email || !password || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' })
    }
    if (email !== user?.email) {
        res.status(400).json({ message: "No such user registered!" })
    }
    if (user?.password) {
        const pwdCheck = bcryptjs.compare(password, user.password)
        if (!pwdCheck) {
            res.status(400).json({ message: "Password is incorrect", success: false })
        }
    }

    res.status(200).json({ message: "User logged in successfully!", success: true })
    console.log('REQUEST BODY(LOGIN):', req.body);
}