import express, { Request, Response } from "express";
import { param, validationResult } from "express-validator";

import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

// Endpoint to search hotels with pagination
router.get("/search", async (req: Request, res: Response) => {
    try {
        // Construct the search query based on the request parameters
        const query = constructSearchQuery(req.query);

        // Sort logic
        let sortOptions = {};
        // Determine the sorting option based on the 'sortOption' query parameter
        switch (req.query.sortOption) {
            case "starRatingAsc":
                sortOptions = { starRating: 1 }; // Sort by star rating in ascending order
                break;
            case "starRatingDesc":
                sortOptions = { starRating: -1 }; // Sort by star rating in descending order
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 }; // Sort by price per night in ascending order
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 }; // Sort by price per night in descending order
                break;
        }

        // Define pagination parameters
        const pageSize = 5; // Number of hotels per page
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        ); // Current page number, default is 1
        const skip = (pageNumber - 1) * pageSize; // Number of hotels to skip for pagination

        // Find hotels in the database with pagination, applying the constructed query and sort options
        const hotels = await Hotel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        // Get total count of hotels in the database matching the query
        const total = await Hotel.countDocuments(query);

        // Construct response object with hotel data and pagination details
        const response: HotelSearchResponse = {
            data: hotels, // Array of hotels for the current page
            pagination: {
                total, // Total number of hotels in the database matching the query
                page: pageNumber, // Current page number
                pages: Math.ceil(total / pageSize), // Total number of pages
            },
        };

        // Send the response as JSON
        res.json(response);
    } catch (error) {
        console.log("error", error);
        // Handle server error if something went wrong
        res.status(500).json({ message: "Something went wrong" });
    }
});

// /api/hotels/<hotelId>
// Endpoint to get a specific hotel by ID
router.get(
    "/:id",
    // Validation middleware using express-validator to ensure the ID parameter is not empty
    [param("id").notEmpty().withMessage("Hotel ID is required")],
    async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return a 400 Bad Request response with validation errors if any
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract the hotel ID from the request parameters
        const id = req.params.id.toString();
        try {
            // Attempt to find the hotel by its ID in the database
            const hotel = await Hotel.findById(id);
            // Respond with the hotel data if found
            res.json(hotel);
        } catch (error) {
            // Handle any errors that occur during the database query
            console.log(error);
            res.status(500).json({ message: "Error fetching hotel" });
        }
    }
);

// Filter logic
// Function to construct the search query based on the request parameters
const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    // Check if 'destination' query parameter is provided
    if (queryParams.destination) {
        // Construct a MongoDB $or query to search in 'city' or 'country' fields
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    // Check if 'adultCount' query parameter is provided
    if (queryParams.adultCount) {
        // Construct a MongoDB $gte query to find hotels with adult capacity greater than or equal to the provided value
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    // Check if 'childCount' query parameter is provided
    if (queryParams.childCount) {
        // Construct a MongoDB $gte query to find hotels with child capacity greater than or equal to the provided value
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    // Check if 'facilities' query parameter is provided
    if (queryParams.facilities) {
        // Construct a MongoDB $all query to find hotels with all specified facilities
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    // Check if 'types' query parameter is provided
    if (queryParams.types) {
        // Construct a MongoDB $in query to find hotels with type matching any of the provided types
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    // Check if 'stars' query parameter is provided
    if (queryParams.stars) {
        // Convert stars to an array of integers if it's provided as a string or array of strings
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star: string) => parseInt(star))
            : parseInt(queryParams.stars);

        // Construct a MongoDB $in query to find hotels with star rating matching any of the provided values
        constructedQuery.starRating = { $in: starRatings };
    }

    // Check if 'maxPrice' query parameter is provided
    if (queryParams.maxPrice) {
        // Construct a MongoDB $lte query to find hotels with price per night less than or equal to the provided value
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};

export default router;
