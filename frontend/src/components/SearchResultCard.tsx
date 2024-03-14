import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
    hotel: HotelType;
};

// Component to display a single search result card for a hotel
const SearchResultCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            {/* Left side: Hotel image */}
            <div className="w-full h-[300px]">
                <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center"
                    alt={`${hotel.name} Image`}
                />
            </div>
            {/* Right side: Hotel details */}
            <div className="grid grid-row-[1fr_2fr_1fr]">
                {/* Hotel rating and type */}
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(
                                (_, index) => (
                                    <AiFillStar
                                        key={index}
                                        className="fill-yellow-400"
                                    />
                                )
                            )}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    {/* Hotel name and Link to hotel detail page */}
                    <Link
                        to={`/detail/${hotel._id}`}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        {hotel.name}
                    </Link>
                </div>
                {/* Hotel description */}
                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>
                {/* Hotel facilities and price */}
                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    {/* Display up to 3 facilities */}
                    <div className="flex gap-1 items-center">
                        {hotel.facilities.slice(0, 3).map((facility, index) => (
                            <span
                                key={index}
                                className="bg-slate-300 p-2 rounded-lg text-xs font-bold whitespace-nowrap"
                            >
                                {facility}
                            </span>
                        ))}
                        {/* Show count of remaining facilities */}
                        <span className="text-sm">
                            {hotel.facilities.length > 3 &&
                                `+${hotel.facilities.length - 3} more`}
                        </span>
                    </div>
                    {/* Hotel price and link to detail page */}
                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">
                            ₹{hotel.pricePerNight} per night
                        </span>
                        <Link
                            to={`/detail/${hotel._id}`}
                            className="bg-blue-600 text-white h-full p-2 text-xl max-w-fit hover:bg-blue-500"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
