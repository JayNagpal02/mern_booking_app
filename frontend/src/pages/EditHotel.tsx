import { useMutation, useQuery } from "react-query"; // Importing react-query hooks for data fetching and mutation
import { useParams } from "react-router-dom"; // Importing useParams hook from react-router-dom for accessing URL parameters
import * as apiClient from "../api-client"; // Importing API client methods
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"; // Importing the form component for managing hotel details
import { useAppContext } from "../contexts/AppContext"; // Importing the application context for showing toasts

/**
 * EditHotel Component
 * Fetches and displays a form to edit and update hotel details.
 */
const EditHotel = () => {
    const { showToast } = useAppContext(); // Accessing showToast function from AppContext for displaying messages

    const { hotelId } = useParams(); // Extracting the hotelId from URL parameters

    // Fetch hotel details based on the hotelId
    const { data: hotel } = useQuery(
        "fetchMyHotelById",
        () => apiClient.fetchMyHotelById(hotelId || ""), // Fetch hotel details by ID using apiClient method
        {
            enabled: !!hotelId, // Enable query when hotelId is available
        }
    );

    // Use react-query's useMutation hook to handle hotel update
    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        // Handle success
        onSuccess: () => {
            showToast({ message: "Hotel Updated!", type: "SUCCESS" }); // Show success message on update
        },
        // Handle error
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" }); // Show error message on update failure
        },
    });

    // Handle saving hotel data
    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData); // Trigger mutation to update hotel data
    };

    // Render ManageHotelForm component with hotel details and save handler
    return (
        <ManageHotelForm
            hotel={hotel} // Pass fetched hotel details as props
            onSave={handleSave} // Pass save handler function as props
            isLoading={isLoading} // Pass loading state as props
        />
    );
};

export default EditHotel; // Export EditHotel component
