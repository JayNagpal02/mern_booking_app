import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config"; // Importing hotel types from configuration
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    // Accessing form context and registering form inputs
    const {
        register,
        watch,
        formState: { errors }, // Destructuring form errors
    } = useFormContext<HotelFormData>();

    // Watching changes in the "type" field
    const typeWatch = watch("type");

    return (
        // Container for the type section
        <div>
            {/* Title of the section */}
            <h2 className="text-2xl font-bold mb-3">Type</h2>

            {/* Displaying radio buttons for hotel types */}
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label
                        className={
                            typeWatch === type
                                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold" // Highlight selected type
                                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
                        }
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register("type", {
                                required: "This field is required", // Validation rules
                            })}
                            className="hidden" // Hide the actual radio input
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>

            {/* Display error message if type field is invalid */}
            {errors.type && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
};

export default TypeSection;
