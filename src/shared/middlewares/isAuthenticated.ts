import { NextFunction, Request, Response } from "express";
import pkg, { Secret } from "jsonwebtoken";
import auth from "../../config/auth.js";
import { AppError } from "../error/AppError.js";
const { verify, Secret } = pkg as any;

type JwtPayloadProps = {
    sub: string
}

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('Failed to verify acess token', 401)
    }

    const token = authHeader?.replace('Bearer ', '')

    try {
        const decodedToken = verify(token, auth.jwt.secret as Secret)
        const { sub } = decodedToken as JwtPayloadProps
        request.user = { id: sub }

        return next()
    } catch {
        throw new AppError('Invalid token', 401)
    }
}
