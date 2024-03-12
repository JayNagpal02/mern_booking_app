import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";

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
