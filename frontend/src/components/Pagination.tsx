// Define the props for the Pagination component
export type Props = {
    page: number; // Current page number
    pages: number; // Total number of pages
    onPageChange: (page: number) => void; // Function to handle page change
};

// Pagination component displays a list of page numbers and handles page navigation
const Pagination = ({ page, pages, onPageChange }: Props) => {
    // Generate an array of page numbers from 1 to the total number of pages
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        // Container for pagination
        <div className="flex justify-center">
            {/* List of page numbers */}
            <ul className="flex border border-slate-300">
                {/* Map over page numbers to render each as a button */}
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        // Apply styling to the currently active page
                        className={`px-2 py-1 ${
                            page === number ? "bg-gray-200" : ""
                        }`}
                    >
                        {/* Button to navigate to the corresponding page */}
                        <button onClick={() => onPageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
