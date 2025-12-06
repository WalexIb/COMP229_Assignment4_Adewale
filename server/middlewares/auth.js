// Authentication Middleware using JWT

import jwt from 'jsonwebtoken';
import config from '../../config/config.js'; 

// Get the JWT secret from configuration
const JWT_SECRET = config.jwtSecret;

/**
 * Middleware function to authenticate requests using JWT.
 * It checks for a valid token in the Authorization header.
 */
const authenticationToken = (req, res, next) => {
    // Extract Token from Header
    const authHeader = req.headers['authorization'];
    
    // Check if token is provided
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        // 401 Unauthorized: The client has not provided credentials (no token)
        return res.status(401).json({ 
            message: "Access Denied. Authentication token is required.",
            error_code: "TOKEN_MISSING"
        });
    }

    // Verify Token
    try {
        // jwt.verify throws an error if the token is invalid or expired
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Attach the decoded payload (user info like id, username, role) to the request
        // This makes user data available in subsequent controllers (e.g., req.user.id)
        req.user = decoded; 
        
        // Token is valid, proceed to the next handler/controller
        next(); 
    } catch (error) {
        // 403 Forbidden: The client provided invalid credentials (invalid/expired token)
        let message = "Invalid token.";
        let errorCode = "TOKEN_INVALID";

        if (error.name === 'TokenExpiredError') {
            message = "Token has expired.";
            errorCode = "TOKEN_EXPIRED";
        } else if (error.name === 'JsonWebTokenError') {
             message = "Malformed or signature invalid token.";
             errorCode = "TOKEN_MALFORMED";
        }
        
        return res.status(403).json({ 
            message: message, 
            error_code: errorCode
        });
    }
};

export default authenticationToken;