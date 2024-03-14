import { hotelTypes } from "../config/hotel-options-config";

// Define the props for the HotelTypesFilter component
type Props = {
    selectedHotelTypes: string[]; // Array of selected hotel types
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle changes in hotel type selection
};

// HotelTypesFilter component displays a list of hotel types with checkboxes for selection
const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        // Container for the hotel types filter
        <div className="border-b border-slate-300 pb-5">
            {/* Title for the hotel types filter */}
            <h4 className="text-base font-semibold mb-2">Hotel Type</h4>
            {/* Map over each hotel type to render a checkbox */}
            {hotelTypes.map((hotelType) => (
                <label key={hotelType} className="flex items-center space-x-2">
                    {/* Checkbox input for the hotel type */}
                    <input
                        type="checkbox"
                        className="rounded"
                        value={hotelType}
                        checked={selectedHotelTypes.includes(hotelType)}
                        onChange={onChange}
                    />
                    {/* Text label for the hotel type */}
                    <span>{hotelType}</span>
                </label>
            ))}
        </div>
    );
};

export default HotelTypesFilter;
