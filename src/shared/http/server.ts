import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import 'dotenv/config'

import { routes } from './routes/index.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use(routes)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`)
})
