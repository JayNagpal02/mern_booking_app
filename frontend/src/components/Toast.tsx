import { useEffect } from "react";

// Define the props for the Toast component
type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

/**
 * Toast Component
 * This component displays a toast message with a specified message and type.
 * @param message - The message to be displayed in the toast.
 * @param type - The type of the toast message (SUCCESS or ERROR).
 * @param onClose - Function to be called when the toast is closed.
 */
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    // Effect to automatically close the toast after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    // Determine styles based on the toast type
    const styles =
        type === "SUCCESS"
            ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
            : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                {/* Display the toast message */}
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
