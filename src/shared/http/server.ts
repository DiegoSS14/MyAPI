import express from 'express'
import 'express-async-errors'

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    return response.status(200).json({message: 'Olá Dev!'})
})

const port: number = 3000

app.listen(port, () => {
    console.log(`Application is running on port ${port}`)
})
