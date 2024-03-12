import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { body } from "express-validator";

import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middlewares/auth";

const router = express.Router();

/**
 * Multer storage configuration to store uploaded image files in memory.
 * Limits each file to a maximum size of 5MB.
 */
const storage = multer.memoryStorage();

/**
 * Multer configuration using memory storage.
 */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

/**
 * POST endpoint to create a new hotel.
 * Protected by authentication middleware to ensure only authenticated users can access.
 * Validates the request body using express-validator.
 * Handles file uploads using multer middleware.
 */
router.post(
    "/",
    verifyToken, // Middleware to verify user authentication
    [
        // Request body validation rules
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("Price per night is required and must be a number"),
        body("facilities")
            .notEmpty()
            .isArray()
            .withMessage("Facilities are required"),
        body("adultCount")
            .notEmpty()
            .isNumeric()
            .withMessage("Adult count is required"),
        body("childCount")
            .notEmpty()
            .isNumeric()
            .withMessage("Child count is required"),
    ],
    upload.array("imageFiles", 6), // Handle file uploads
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[]; // Extract uploaded image files
            const newHotel: HotelType = req.body; // Extract hotel data from request body

            const imageUrls = await uploadImages(imageFiles);

            // Add image URLs to the new hotel data
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId; // Add user ID from authentication

            // Save the new hotel to the database
            const hotel = new Hotel(newHotel);
            await hotel.save();

            // Return the created hotel object in the response
            res.status(201).send(hotel);
        } catch (error) {
            console.log("Error creating hotel : ", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotel" });
    }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;
