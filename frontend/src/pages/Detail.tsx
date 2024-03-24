import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
    // Get the hotelId from the URL params using useParams hook
    const { hotelId } = useParams();

    // Fetch hotel data using useQuery hook from react-query
    const { data: hotel } = useQuery(
        "fetchHotelById", // Query key for caching
        () => apiClient.fetchHotelById(hotelId as string), // API call to fetch hotel data
        {
            enabled: !!hotelId, // Enable query only when hotelId exists
        }
    );

    // If hotel data is not yet available, return an empty fragment
    if (!hotel) {
        return <></>;
    }

    // Render hotel details using retrieved hotel data
    return (
        <div className="space-y-6">
            <div>
                {/* Render star rating icons based on hotel's starRating */}
                <span className="flex">
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className="fill-yellow-400" />
                    ))}
                </span>
                {/* Render hotel name */}
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>

            {/* Render hotel images in a grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((image, index) => (
                    <div key={index} className="h-[300px]">
                        <img
                            src={image}
                            alt={hotel.name}
                            className="rounded-md w-full h-full object-cover object-center"
                        />
                    </div>
                ))}
            </div>

            {/* Render hotel facilities in a grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {hotel.facilities.map((facility, index) => (
                    <div
                        key={index}
                        className="border border-slate-300 rounded-md p-3"
                    >
                        {facility}
                    </div>
                ))}
            </div>

            {/* Render hotel description */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    <GuestInfoForm
                        pricePerNight={hotel.pricePerNight}
                        hotelId={hotel._id}
                    />
                </div>
            </div>
        </div>
    );
};

export default Detail;
