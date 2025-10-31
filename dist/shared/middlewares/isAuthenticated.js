import pkg from "jsonwebtoken";
import auth from "../../config/auth.js";
import { AppError } from "../error/AppError.js";
const { verify, Secret } = pkg;
export const isAuthenticated = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('Failed to verify acess token', 401);
    }
    const token = authHeader?.replace('Bearer ', '');
    try {
        const decodedToken = verify(token, auth.jwt.secret);
        const { sub } = decodedToken;
        request.user = { id: sub };
        return next();
    }
    catch {
        throw new AppError('Invalid token', 401);
    }
};
