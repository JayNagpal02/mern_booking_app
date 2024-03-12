import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import User from "../models/user";

// create new express router instance
const router = express.Router();

// route for user registration
router.post(
    "/register",
    [
        /**
         * this middleware is going to check if first name property exists in the body in the request
         * and if it does not exists its going to return an error
         * with a message 'First Name is required'
         * and its also going to check that first name is of type string
         *
         * similar for =>
         * last name is of type string
         * email is of type email
         * password is of has a minimum length of 6 characters
         */
        check("firstName", "First Name is required").isString(),
        check("lastName", "Last Name is required").isString(),
        check("email", "Email is required").isEmail(),
        check(
            "password",
            "Password with 6 or more characters required"
        ).isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        // check if any errors are encountered by express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if errors are encountered, return error
            return res.status(400).json({ message: errors.array() });
        }

        try {
            // check if the user already exists
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                // if user exists, return error
                return res.status(400).json({ message: "User already exists" });
            }

            // create a new user instance
            user = new User(req.body);

            // save the new user to the database
            await user.save();

            // generate JWT token
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

            // send success response
            res.status(200).send({ message: "User registered OK" });
        } catch (error) {
            // handle errors
            console.log(error);
            res.status(500).send({ message: "Something went wrong" });
        }
    }
);

export default router;
