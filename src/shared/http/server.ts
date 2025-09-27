import cors from 'cors'
import 'dotenv/config'
import express, { type NextFunction, type Request, type Response } from 'express'
import 'express-async-errors'
import { AppError } from '../error/AppError.js'

import { routes } from './routes/index.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: "Internal server error"
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`)
})
