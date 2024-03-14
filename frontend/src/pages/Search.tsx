import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

// Search component to display search results and filters
const Search = () => {
    // Access search context to get search parameters
    const search = useSearchContext();

    // State to manage the current page for pagination
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    // Construct search parameters object
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };

    // Fetch hotel data based on search parameters using react-query's useQuery hook
    const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
        apiClient.searchHotels(searchParams)
    );

    // Handle changes in selected star ratings
    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) =>
            event.target.checked
                ? [...prevStars, starRating]
                : prevStars.filter((star) => star !== starRating)
        );
    };

    // Handle changes in selected hotel types
    const handleHotelTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const hotelType = event.target.value;
        setSelectedHotelTypes((prevHotelTypes) =>
            event.target.checked
                ? [...prevHotelTypes, hotelType]
                : prevHotelTypes.filter((type) => type !== hotelType)
        );
    };

    // Handle changes in selected facilities
    const handleFacilitiesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const facility = event.target.value;
        setSelectedFacilities((prevFacilities) =>
            event.target.checked
                ? [...prevFacilities, facility]
                : prevFacilities.filter(
                      (prevFacility) => prevFacility !== facility
                  )
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            {/* Left side panel for filters */}
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    {/* Star rating filter */}
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    {/* Hotel types filter */}
                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />
                    {/* Facilities filter */}
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilitiesChange}
                    />
                    {/* Price filter */}
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />
                </div>
            </div>
            {/* Right side panel for search results */}
            <div className="flex flex-col gap-5">
                {/* Header section displaying total number of hotels found */}
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    {/* Dropdown for sorting options */}
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="starRatingAsc">
                            Star Rating (low to high)
                        </option>
                        <option value="starRatingDesc">
                            Star Rating (high to low)
                        </option>
                        <option value="pricePerNightAsc">
                            Price Per Night (low to high)
                        </option>
                        <option value="pricePerNightDesc">
                            Price Per Night (high to low)
                        </option>
                    </select>
                </div>
                {/* Render search result cards for each hotel */}
                {hotelData?.data.map((hotel) => (
                    <SearchResultCard key={hotel._id} hotel={hotel} />
                ))}
                {/* Pagination component */}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
