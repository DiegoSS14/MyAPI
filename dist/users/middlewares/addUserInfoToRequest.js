import { decode } from 'jsonwebtoken';
export const addUserInfoToRequest = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Acess token not present'
        });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Acess token not present'
        });
    }
    try {
        const { sub } = decode(token);
        request.user = { id: sub };
        return next(); // Continua o fluxo da aplicação
    }
    catch (error) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Acess token not present'
        });
    }
};
