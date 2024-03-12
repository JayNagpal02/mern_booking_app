import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface to include userId property
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

/**
 * Middleware function to verify JWT token.
 * Checks if the request contains a valid JWT token in the "auth_token" cookie.
 * If the token is valid, extracts the userId from the token payload and attaches it to the request object.
 * If the token is invalid or missing, returns a 401 Unauthorized response.
 */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the JWT token from the "auth_token" cookie
    const token = req.cookies["auth_token"];

    // If token is missing, return 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        // Extract userId from the decoded token payload and attach it to the request object
        req.userId = (decoded as jwt.JwtPayload).userId;

        // Call the next middleware function
        next();
    } catch (error) {
        // If token is invalid, return 401 Unauthorized response
        return res.status(401).json({ message: "unauthorized" });
    }
};

export default verifyToken;
