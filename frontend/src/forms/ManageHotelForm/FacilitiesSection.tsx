import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    // Access form context to register form inputs and handle errors
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        // Container for the facilities section
        <div>
            {/* Title of the section */}
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {/* Map through each hotel facility and create a checkbox for it */}
                {hotelFacilities.map((facility) => (
                    <label className="text-sm flex gap-1 text-gray-700">
                        <input
                            type="checkbox"
                            value={facility}
                            // Register each facility checkbox with the form
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one facility is required";
                                    }
                                },
                            })}
                        />
                        {facility}
                    </label>
                ))}
            </div>

            {/* Display error message if facilities validation fails */}
            {errors.facilities && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    );
};

export default FacilitiesSection;
