import 'reflect-metadata'

import 'dotenv/config'
import { app } from './app.js';

import { dataSource } from '../typeorm/index.js'

dataSource.initialize().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`)
    })
})

