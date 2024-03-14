// Define the type for hotel data
export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
};

// Define the type for hotel search response will have
export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};
