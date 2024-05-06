import express, { NextFunction, Request, Response, Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.ts'
import authRoutes from './routes/auth.route.ts'
import postRoutes from './routes/post.route.ts'
import commentRoutes from './routes/comment.route.ts'
import { errorHandler } from './utils/error.ts';
import { CustomError } from './interfaces.ts';

// middleware
const app = express()

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());
dotenv.config()

// console.log(process.env.PASSWORD_DB);

if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    })
} else {
    console.log('environment variable is undefined!');
}

// vars

// routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        text: 'Additional error information here',
    });
});

const port = 3307
app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})