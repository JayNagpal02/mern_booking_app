import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

// Component for managing hotel images section
const ImagesSection = () => {
    // Access form context to register form inputs and handle errors
    const {
        register, // Register form inputs
        formState: { errors }, // Get form errors
        watch, // Watch form values
        setValue, // Set form values
    } = useFormContext<HotelFormData>(); // Get form context and specify type

    const existingImageUrls = watch("imageUrls"); // Get existing image URLs from form data

    // Function to handle image deletion
    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>, // Event handler for delete button click
        imageUrl: string // URL of the image to delete
    ) => {
        event.preventDefault(); // Prevent default button behavior
        setValue(
            // Set form value for imageUrls after removing the deleted image URL
            "imageUrls",
            existingImageUrls.filter((url) => url !== imageUrl) // Filter out the deleted image URL
        );
    };

    return (
        // Container for the images section
        <div>
            {/* Title of the section */}
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && ( // Render existing images if available
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div className="relative group" key={url}>
                                {" "}
                                {/* Use URL as key */}
                                <img
                                    src={url}
                                    className="min-h-full object-cover"
                                />
                                <button
                                    onClick={
                                        (event) => handleDelete(event, url) // Call handleDelete function on button click
                                    }
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* Input field for selecting multiple images */}
                <input
                    type="file" // Input type for selecting multiple images
                    multiple // Allow multiple images to be selected
                    accept="image/*" // Accept only image files
                    className="w-full text-gray-700 font-normal"
                    // Register imageFiles input with the form and add validation
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength =
                                imageFiles.length +
                                (existingImageUrls?.length || 0);
                            // Validate number of selected images
                            if (totalLength === 0) {
                                return "Please upload at least one image"; // Display error if no image is selected
                            } else if (totalLength > 6) {
                                return "You can only upload 6 images"; // Display error if more than 6 images are selected
                            }
                            return true; // Validation passed
                        },
                    })}
                />
            </div>

            {/* Display error message for imageFiles field if present */}
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;
