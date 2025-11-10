export default {
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret',
        expiresIn: process.env.EXPIRES_IN || '1d'
    },
    refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET || 'default',
        expiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
        duration: Number(process.env.REFRESH_DURATION) || 600000
    }
};
