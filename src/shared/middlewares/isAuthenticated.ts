import { Request, Response, NextFunction } from "express";
import auth from "../../config/auth.js";
import { AppError } from "../error/AppError.js";
import pkg, { Secret } from "jsonwebtoken";
const { verify, Secret } = pkg as any;

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('Failed to verify acess token', 401)
    }

    const token = authHeader?.replace('Bearer ', '')

    try {
        verify(token, auth.jwt.secret as Secret)
        return next()
    } catch {
        throw new AppError('Invalid token', 401)
    }
}
