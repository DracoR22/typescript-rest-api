import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './router'

const app = express()

dotenv.config()

app.use(cors({ credentials: true }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/', router)

const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/')
})

const connectDB = (url: any) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))
}

connectDB(process.env.MONGODB_URL)
