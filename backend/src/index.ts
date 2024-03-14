import path from "path";

import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// connect to MongoDB Atlas
// whenever we run the app, the first thing is going to do is try to connect to the MongoDB Atlas
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// get the default connection
const db = mongoose.connection;

// bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/**
 * bind connection to open event
 * and we are passing an arrow function which will just log connected to MongoDB
 */
db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
});

// create new express app
const app = express();

// use cookie parser middleware
app.use(cookieParser());

// convert body of API request into JSON format
app.use(express.json());

// parse the data of the request or parse URL to get the parameters
app.use(express.urlencoded({ extended: true }));

// allow us to protect or block different URL requests we don't want to handle
// allow CORS for specified origin and with credentials
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// serve static files from frontend build directory
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

/**
 * created an endpoint called 'api/test'
 * for get requests and
 * it will return JSON object as the response
 */
app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello from Express endpoint!" });
});

// auth routes
app.use("/api/auth", authRoutes);

// user routes
app.use("/api/users", userRoutes);

// my hotel routes
app.use("/api/my-hotels", myHotelRoutes);

// hotels routes
app.use("/api/hotels", hotelRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

/**
 * listen for requests at port 5000 (it can be any port number like 7000 or 8000)
 * and we are passing an arrow function which will just log server is listening
 */
app.listen(5000, () => {
    console.log("Server running on localhost:5000");
});
