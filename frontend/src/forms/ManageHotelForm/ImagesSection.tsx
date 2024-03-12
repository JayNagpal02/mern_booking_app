import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    // Access form context to register form inputs and handle errors
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HotelFormData>();

    const existingImageUrls = watch("imageUrls");

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        setValue(
            "imageUrls",
            existingImageUrls.filter((url) => url !== imageUrl)
        );
    };

    return (
        // Container for the images section
        <div>
            {/* Title of the section */}
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div className="relative group">
                                <img
                                    src={url}
                                    className="min-h-full object-cover"
                                />
                                <button
                                    onClick={(event) =>
                                        handleDelete(event, url)
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
                    type="file" // input type for selecting multiple images
                    multiple // multiple images are allowed
                    accept="image/*" // input type for selecting images only
                    className="w-full text-gray-700 font-normal"
                    // Register imageFiles input with the form and add validation
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength =
                                imageFiles.length +
                                (existingImageUrls?.length || 0);
                            // if no image is selected
                            if (totalLength === 0) {
                                return "Please upload at least one image";
                            }
                            // if more than 6 images are selected
                            else if (totalLength > 6) {
                                return "You can only upload 6 images";
                            }
                            return true;
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
