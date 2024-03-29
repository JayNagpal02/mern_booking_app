import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

// Define the shape of the form data for managing hotel information
export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

// Define the props for the ManageHotelForm component
type Props = {
    hotel?: HotelType; // Optional hotel object, used for editing existing hotel
    onSave: (hotelFormData: FormData) => void; // Function to handle saving hotel data
    isLoading: boolean; // Flag indicating whether the form is in a loading state
};

// Component for managing hotel form data
const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    // Initialize form methods using react-hook-form
    const formMethods = useForm<HotelFormData>(); // useForm hook to create form methods
    const { handleSubmit, reset } = formMethods; // Destructure handleSubmit and reset methods

    useEffect(() => {
        reset(hotel); // Reset form values when hotel data changes
    }, [hotel, reset]); // Dependency array to trigger effect when hotel or reset method changes

    // Handle form submission
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // Create a new FormData object to send form data as multipart/form-data
        const fd = new FormData();

        if (hotel) {
            fd.append("hotelId", hotel._id); // Append hotel ID if editing existing hotel
        }

        // Append string fields to the FormData object
        fd.append("name", formDataJson.name);
        fd.append("city", formDataJson.city);
        fd.append("country", formDataJson.country);
        fd.append("description", formDataJson.description);
        fd.append("type", formDataJson.type);
        fd.append("pricePerNight", formDataJson.pricePerNight.toString());
        fd.append("starRating", formDataJson.starRating.toString());
        fd.append("adultCount", formDataJson.adultCount.toString());
        fd.append("childCount", formDataJson.childCount.toString());

        // Append facilities array to FormData object
        formDataJson.facilities.forEach((facility, index) => {
            fd.append(`facilities[${index}]`, facility);
        });

        // Append image URLs to FormData object
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                fd.append(`imageUrls[${index}]`, url);
            });
        }

        // Append image files to FormData object
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            fd.append(`imageFiles`, imageFile);
        });

        onSave(fd); // Send FormData object to onSave function
    });

    // Render form sections and submit button
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                {/* Form sections */}
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />

                {/* Submit button */}
                <span className="flex justify-end">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm; // Export ManageHotelForm component
