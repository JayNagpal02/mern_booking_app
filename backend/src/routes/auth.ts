import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// route for user login
router.post(
    "/login",
    [
        check("email", "Email is required").isEmail(),
        check(
            "password",
            "Password with 6 or more characters required"
        ).isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        // destructing email and password fields from the body of the request
        const { email, password } = req.body;

        try {
            // check if the user already exists
            const user = await User.findOne({ email });

            if (!user) {
                // if user does not exist, return error
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            // if user exist, using bcrypt compare whether password entered by user and password in DB are same
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                // if password does not match, return error
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            // if password matches, create a JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: "1d",
                }
            );

            // set the JWT token as a cookie
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000, // 24 hours
            });

            // return response
            res.status(200).json({ userId: user._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

/**
 * whenever we make a request to "/validate-token" endpoint
 * its going to run verifyToken middleware which will check the HTTP Cookie that was sent to us by the frontend in the request
 * depending on this middleware passes or not
 * if check passes we will forward request to next() and then all we are doing is saying okay the token is valid
 * and we are going to
 * @returns status of 200 and
 * @returns userId which we get from the request
 */
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});

/**
 * Route for user logout.
 * Clears the auth_token cookie.
 */
router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
});

export default router;
