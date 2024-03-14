import React, { useContext, useState } from "react";

// Define the type for the SearchContext
type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string
    ) => void;
};

// Create a context for the SearchContext
const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

/**
 * SearchContextProvider Component
 * This component provides the SearchContext to its children.
 * It manages the search-related state and provides functions to update the state.
 * @param children - The child components that will have access to the SearchContext.
 */
export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [destination, setDestination] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>("");

    /**
     * Function to save search values.
     * Updates the search-related state with new values.
     * @param destination - The destination for the search.
     * @param checkIn - The check-in date for the search.
     * @param checkOut - The check-out date for the search.
     * @param adultCount - The number of adults for the search.
     * @param childCount - The number of children for the search.
     * @param hotelId - Optional parameter for the hotel ID, if available.
     */
    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string
    ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
    };

    // Provide the SearchContext value to its children components
    return (
        <SearchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childCount,
                hotelId,
                saveSearchValues,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

/**
 * Custom hook to access the SearchContext.
 * @returns The context value containing the search-related state and update function.
 */
export const useSearchContext = () => {
    // Use useContext to access the SearchContext
    const context = useContext(SearchContext);
    // Return the context as SearchContext type
    return context as SearchContext;
};
