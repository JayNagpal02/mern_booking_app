// Define the props for the StarRatingFilter component
type Props = {
    selectedStars: string[]; // Selected star ratings
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle changes in selected star ratings
};

// StarRatingFilter component displays checkboxes to select star ratings
const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
        // Container for the star rating filter
        <div className="border-b border-slate-300 pb-5">
            {/* Title for the star rating filter */}
            <h4 className="text-base font-semibold mb-2">Property Rating</h4>
            {/* Map over star ratings to render each checkbox */}
            {["5", "4", "3", "2", "1"].map((star) => (
                <label key={star} className="flex items-center space-x-2">
                    {/* Checkbox input for each star rating */}
                    <input
                        type="checkbox"
                        className="rounded"
                        value={star} // Set the value of the checkbox
                        checked={selectedStars.includes(star)} // Check if the star rating is selected
                        onChange={onChange} // Handle change event for checkbox
                    />
                    {/* Display the star rating */}
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    );
};

export default StarRatingFilter;
