export default {
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret',
        expiresIn: process.env.EXPIRES_IN || '1d'
    }
}
