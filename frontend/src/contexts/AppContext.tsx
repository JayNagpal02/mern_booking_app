import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

// Define the type for a toast message
type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

// Define the type for the AppContext
type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
};

// Create a context for the AppContext
const AppContext = React.createContext<AppContext | undefined>(undefined);

/**
 * AppContextProvider Component
 * This component provides the AppContext to its children.
 * @param children - The child components that will have access to the AppContext.
 */
export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Create a state variable for the toast message whether it has been displayed or not.
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    // Use react-query to check token validation status
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    return (
        // Provide the AppContext value to the children components
        <AppContext.Provider
            value={{
                // Function to show a toast message
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                // Check if the user is logged in based on token validation status
                isLoggedIn: !isError,
            }}
        >
            {/* Display the toast message if it exists */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

/**
 * Custom hook to access the AppContext.
 * @returns The context value containing the showToast function.
 */
export const useAppContext = () => {
    // Use useContext to access the AppContext
    const context = useContext(AppContext);
    // Cast the context to the AppContext type
    return context as AppContext;
};
