import { hotelFacilities } from "../config/hotel-options-config";

// Define the props for the FacilitiesFilter component
type Props = {
    selectedFacilities: string[]; // Array of selected facilities
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle changes in facility selection
};

// FacilitiesFilter component displays a list of hotel facilities with checkboxes for selection
const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
    return (
        // Container for the facilities filter
        <div className="border-b border-slate-300 pb-5">
            {/* Title for the facilities filter */}
            <h4 className="text-base font-semibold mb-2">Facilities</h4>
            {/* Map over each hotel facility to render a checkbox */}
            {hotelFacilities.map((hotelFacility) => (
                <label
                    key={hotelFacility}
                    className="flex items-center space-x-2"
                >
                    {/* Checkbox input for the facility */}
                    <input
                        type="checkbox"
                        className="rounded"
                        value={hotelFacility}
                        checked={selectedFacilities.includes(hotelFacility)}
                        onChange={onChange}
                    />
                    {/* Text label for the facility */}
                    <span>{hotelFacility}</span>
                </label>
            ))}
        </div>
    );
};

export default FacilitiesFilter;
