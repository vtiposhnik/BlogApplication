import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';


// middleware
const app = express()

app.use(bodyParser.json());
app.use(cors());
dotenv.config()

// vars
const port = 3307

// routes

app.get('/', (req, res) => {
    res.send('ladidabudubadabi')
})

app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})