import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    return response.status(200).json({message: 'Olá Dev!'})
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`)
})
