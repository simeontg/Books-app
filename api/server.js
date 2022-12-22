import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import cors from 'cors'
import 'express-async-errors'
import morgan from 'morgan'
import authRouter from './routes/authRoutes.js'
import booksRouter from './routes/booksRouter.js'
import commentsRouter from './routes/commentsRoutes.js'
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/books', booksRouter)
app.use('/api/v1/comments', commentsRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
      await connectDB(process.env.MONGO_URL)
      app.listen(port, () => { 
        console.log(`Server running on port ${port}`)
    })    
    }catch(error){
        console.log(error)
    }
}

start()