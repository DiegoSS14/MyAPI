import auth from "../../config/auth.js";
import { AppError } from "../error/AppError.js";
import pkg from "jsonwebtoken";
const { verify, Secret } = pkg;
export const isAuthenticated = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('Failed to verify acess token', 401);
    }
    const token = authHeader?.replace('Bearer ', '');
    try {
        verify(token, auth.jwt.secret);
        return next();
    }
    catch {
        throw new AppError('Invalid token', 401);
    }
};
