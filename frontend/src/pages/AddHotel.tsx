import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

// Component for adding a new hotel
const AddHotel = () => {
    const { showToast } = useAppContext();

    // Use react-query's useMutation hook to handle hotel addition
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        // Handle success
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
        },
        // Handle error
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        },
    });

    // Handle saving hotel data
    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
