import { NextFunction, Request, Response } from 'express'
import { decode } from 'jsonwebtoken'

type JWTPayloadProps = {
    sub: string
}

export const addUserInfoToRequest = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Acess token not present'
        })
    }

    const token = authHeader.replace('Bearer ', '')
    if (!token) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Acess token not present'
        })
    }

    try {
        const { sub } = decode(token) as JWTPayloadProps
        request.user = { id: sub }
        return next() // Continua o fluxo da aplicação
    } catch (error) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Acess token not present'
        })
    }
}
