import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.ts'
import authRoutes from './routes/auth.route.ts'

// middleware
const app = express()

app.use(bodyParser.json());
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
const port = 3307

// routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})