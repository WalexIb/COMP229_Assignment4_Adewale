const config = {
    // Environment
    env: process.env.NODE_ENV || 'development',

    // Server port
    port: process.env.PORT || 3000,

    // JWT secret
    jwtSecret: process.env.JWT_SECRET || 'adewale_2025_jwt_secret',

    // Local MongoDB URI
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio'
};

export default config;
