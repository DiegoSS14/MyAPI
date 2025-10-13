import express from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import cors from 'cors';
import { AppError } from '../error/AppError.js';
import { routes } from './routes/index.js';
import swaggerFile from '../../../swagger.json' with { type: "json" }; // Importando com type json
const app = express();
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);
app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    return response.status(500).json({
        status: "Error",
        message: "Internal server error"
    });
});
export { app };
