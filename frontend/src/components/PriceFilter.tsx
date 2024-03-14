// Define the props for the PriceFilter component
type Props = {
    selectedPrice?: number; // Selected maximum price
    onChange: (value?: number) => void; // Function to handle changes in selected price
};

// PriceFilter component displays a dropdown to select maximum price
const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        // Container for the price filter
        <div>
            {/* Title for the price filter */}
            <h4 className="text-base font-semibold mb-2">Max Price</h4>
            {/* Dropdown to select maximum price */}
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice} // Set the selected value of the dropdown
                onChange={(event) =>
                    onChange(
                        event.target.value
                            ? parseInt(event.target.value)
                            : undefined // Parse the selected value to number or set it to undefined if empty
                    )
                }
            >
                {/* Default option */}
                <option value="">Select Max Price</option>
                {/* Map over available price options to render each option */}
                {[2000, 5000, 10000, 20000, 30000].map((price) => (
                    <option key={price} value={price}>
                        {price}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PriceFilter;
