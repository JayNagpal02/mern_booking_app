import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const {
        register, // Registering input fields with useFormContext hook
        formState: { errors }, // Extracting errors from useFormContext hook
    } = useFormContext<HotelFormData>(); // Accessing form context and specifying the form data type

    return (
        // Container for the details section
        <div className="flex flex-col gap-4">
            {/* Title of the section */}
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            {/* Input field for the name */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", {
                        required: "This field is required", // Validation rule for required field
                    })}
                />
                {/* Error message for name field */}
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>

            {/* Container for city and country inputs */}
            <div className="flex gap-4">
                {/* Input field for city */}
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", {
                            required: "This field is required", // Validation rule for required field
                        })}
                    />
                    {errors.city && (
                        <span className="text-red-500">
                            {errors.city.message}
                        </span>
                    )}
                </label>

                {/* Input field for country */}
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", {
                            required: "This field is required", // Validation rule for required field
                        })}
                    />
                    {errors.country && (
                        <span className="text-red-500">
                            {errors.country.message}
                        </span>
                    )}
                </label>
            </div>

            {/* Textarea for description */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", {
                        required: "This field is required", // Validation rule for required field
                    })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">
                        {errors.description.message}
                    </span>
                )}
            </label>

            {/* Input field for price per night */}
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", {
                        required: "This field is required", // Validation rule for required field
                    })}
                />
                {errors.pricePerNight && (
                    <span className="text-red-500">
                        {errors.pricePerNight.message}
                    </span>
                )}
            </label>

            {/* Select dropdown for star rating */}
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select
                    {...register("starRating", {
                        required: "This field is required", // Validation rule for required field
                    })}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                    <option value="" className="text-sm font-bold">
                        Select as Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">
                        {errors.starRating.message}
                    </span>
                )}
            </label>
        </div>
    );
};

export default DetailsSection;
