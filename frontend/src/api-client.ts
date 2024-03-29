import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types";

// Access the API_BASE_URL from the environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Function to register a user.
 * @param FormData - Data of the user to be registered.
 * @throws Error if registration fails.
 */
export const register = async (FormData: RegisterFormData) => {
    // Send a POST request to the registration endpoint
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
    });

    // Parse response body as JSON
    const responseBody = await response.json();

    // If the response is not successful, throw an error with the error message from the response
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

/**
 * Function to sign-in a user.
 * @param FormData - Data of the user to be sign-in.
 * @throws Error if registration fails.
 * @returns JSON response if sign-in is successful.
 */
export const signIn = async (FormData: SignInFormData) => {
    // Send a POST request to the login endpoint
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
    });

    // Parse response body as JSON
    const responseBody = await response.json();

    // If the response is not successful, throw an error with the error message from the response
    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
};

/**
 * Function to validate user token.
 * Sends a request to the token validation endpoint.
 * @throws Error if the token is invalid.
 * @returns JSON response if the token is valid.
 */
export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
};

/**
 * Function to sign out the user.
 * Sends a request to the sign-out endpoint.
 * @throws Error if there is an error during sign out.
 */
export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }
};

/**
 * Function to add a hotel.
 * @param hotelFormData - Data of the hotel to be added.
 * @throws Error if adding hotel fails.
 * @returns JSON response if adding hotel is successful.
 */
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
};

/**
 * Function to fetch hotels belonging to the authenticated user.
 * @throws Error if there is an error fetching hotels.
 * @returns Promise resolved with an array of HotelType objects.
 */
export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};

/**
 * Function to fetch hotel by id belonging to the authenticated user.
 * @throws Error if there is an error fetching hotels.
 * @returns Promise resolved with a HotelType objects.
 */
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotel");
    }

    return response.json();
};

/**
 * Function to update a hotel by id belonging to the authenticated user.
 * @throws Error if there is an error fetching hotels.
 * @returns Promise resolved with a HotelType objects.
 */
export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(
        `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
        {
            method: "PUT",
            body: hotelFormData,
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update Hotel");
    }

    return response.json();
};

// Define a type for search parameters
// This will help us keep track of all the different search parameters, filters, and sort order.
export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

/**
 * Function to search hotels based on provided search parameters.
 * @param searchParams - Object containing search parameters.
 * @throws Error if there is an error fetching hotels.
 * @returns Promise resolved with a HotelSearchResponse object.
 */
export const searchHotels = async (
    searchParams: SearchParams
): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
    );
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
    );

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};

/**
 * Function to fetch a specific hotel by ID from the API.
 * @param hotelId The ID of the hotel to fetch.
 * @throws Error if there is an error fetching the hotel.
 * @returns Promise resolved with the hotel data.
 */
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    // Fetch the hotel data from the API using the provided hotelId
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    // Check if the response is not successful (HTTP status code other than 2xx)
    if (!response.ok) {
        // Throw an error indicating the failure to fetch the hotel
        throw new Error("Error fetching Hotel");
    }

    // If the response is successful, parse and return the JSON data
    return response.json();
};
