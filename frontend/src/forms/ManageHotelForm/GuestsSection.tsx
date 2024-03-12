import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    // Access form context to register form inputs and handle errors
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        // Container for the guest section
        <div>
            {/* Title of the section */}
            <h2 className="text-2xl font-bold mb-3">Guests</h2>

            <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
                {/* Input field for number of adults */}
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input
                        type="number"
                        min={1}
                        className="border rounded w-full py-1 px-2 font-normal"
                        // Register adultCount input with the form
                        {...register("adultCount", {
                            required: "This field is required",
                        })}
                    />
                    {/* Display error message for adultCount field if present */}
                    {errors.adultCount?.message && (
                        <span className="text-red-500 text-sm font-bold">
                            {errors.adultCount?.message}
                        </span>
                    )}
                </label>

                {/* Input field for number of children */}
                <label className="text-gray-700 text-sm font-semibold">
                    Children
                    <input
                        type="number"
                        min={0}
                        className="border rounded w-full py-1 px-2 font-normal"
                        // Register childCount input with the form
                        {...register("childCount", {
                            required: "This field is required",
                        })}
                    />
                    {/* Display error message for childCount field if present */}
                    {errors.childCount?.message && (
                        <span className="text-red-500 text-sm font-bold">
                            {errors.childCount?.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;
